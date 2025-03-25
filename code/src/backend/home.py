import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from fastapi import FastAPI, File, UploadFile,HTTPException
import uvicorn
import io
from PyPDF2 import PdfReader 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # Import BaseModel from Pydantic
from utils.utils import load_llm,load_data,get_column_names,extract_data_chunks,load_vector_store,get_document_embeddings,prompt_template,process_llm_output,parse_violations,store_violations
from langchain_ollama import OllamaEmbeddings
import os
from dotenv import load_dotenv
from rule_generation_pipeline.graph_setup import build_graph
from chat_pipeline import workflow
from langchain_core.messages import HumanMessage
import glob


load_dotenv()

from fastapi.responses import FileResponse
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

llm=None
embedding_model=None
vector_store=None
rules=None
chatapp=None

class TextInput(BaseModel):
    text: str

@app.on_event("startup")
def startup_event():
    print("Loading models...")
    global llm, vector_store,embedding_model 
    embedding_model=OllamaEmbeddings(model="nomic-embed-text")
    llm=load_llm("google","gemini-2.0-flash-lite",api_key=os.getenv("GOOGLE_API_KEY") )
    vector_store=load_vector_store(embedding_model)
UPLOAD_FOLDER = "../regulatory_files"  # Directory to store uploaded files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists

@app.get("/getFlaggedCustomers")
async def getFlaggedCustomers():
    global rules, chatapp
    try:
        if rules is None:
            raise HTTPException(status_code=400, detail="Please generate rules first")
        context_prompt = '''
    Analyze the given  excel row  %s against the set of rules.
    Task:
    1. Identify any violations of the rules in row given.
    2. Suggest remediations for each violation.
    3. output a boolean indicating if any violation exists in the row.
    4. generate a risk score between 0 and 100 based on the violations.
    Ouput format:
    Violation: <violation_description for all columns in the row>
    Remediation: <remediation_description for all columns in the row>
    violation_exists: <boolean>
    risk_score: <risk_score>
    
    example output: 
Violation: Customer ID: Invalid format, contains a decimal and is not a string.
Violation: Industry Code: Potentially valid, requires NAICS/SIC/GICS lookup verification.
Violation: Taxpayer ID (TIN): Invalid format.
Violation: CUSIP: Invalid format.
Violation: Interest Rate: Invalid format, should be a decimal.
Violation: Credit Facility Type: Invalid format, should be an integer.
Violation: Credit Facility Purpose: Invalid format, should be an integer.
Violation: Collateral Type: Invalid format, should be an integer.
Violation: Syndicated Loan Flag: Invalid format, should be an integer.
Violation: Disposition Flag: Invalid format, should be an integer.
Remediation: Customer ID: Remove the decimal and convert to string.
Remediation: Industry Code: Verify the code against NAICS/SIC/GICS databases.
Remediation: Taxpayer ID (TIN): Ensure the format matches the requirements.
Remediation: CUSIP: Ensure the format matches the requirements.
Remediation: Interest Rate: Convert to decimal format (e.g., 0.018).
Remediation: Credit Facility Type: Convert to integer based on the predefined codes.
Remediation: Credit Facility Purpose: Convert to integer based on the predefined codes.
Remediation: Collateral Type: Convert to integer based on the predefined codes.
Remediation: Syndicated Loan Flag: Convert to integer based on the predefined codes.
Remediation: Disposition Flag: Convert to integer based on the predefined codes.
violation_exists: True
risk_score: 80

Give output exactly in same format as example output.
    
    '''
        csv_files = glob.glob(os.path.join("./temp", "*.csv"))
        responses=[]
        if len(csv_files) == 1:
            csv_file = csv_files[0]
            df=load_data(csv_file)
            for i in range(len(df)):
                if i==0:
                    continue
                meta_data={}
                row=df.iloc[i]
                input_messages = [HumanMessage(context_prompt % row)]
                output = chatapp.invoke({"messages": input_messages}, {"configurable": {"thread_id": "abc123"}})
                response_text = output["messages"][-1].content
                print("response_text",response_text)
                meta_data["row_index"]=i
                meta_data["violations_data"]=parse_violations(response_text)
                meta_data["row"]=row.replace({np.nan: None}).to_dict()
                responses.append(meta_data)
            store_violations(df,responses,"./temp")
            return {"message": "data flagged successfully", "data": responses}
        elif len(csv_files) == 0:
            raise HTTPException(status_code=400, detail="Please upload data file first")
        else:
            raise HTTPException(status_code=400, detail="Please upload only one data file")
    except Exception as e:
        return {"error": f"Failed to refine text: {str(e)}"}

@app.post("/generateRules")
async def process_files(files: list[UploadFile] = File(...)):
    print("Endpoint hit")
    global llm, vector_store,rules,chatapp
    try:
        # Ensure exactly 2 files are uploaded
        if len(files) != 2:
            raise HTTPException(status_code=400, detail="Please upload exactly one CSV and one PDF file")

        # Identify which is CSV and which is PDF
        csv_file = next((f for f in files if f.filename.endswith(".csv")), None)
        pdf_file = next((f for f in files if f.filename.endswith(".pdf")), None)

        if not csv_file or not pdf_file:
            raise HTTPException(status_code=400, detail="Please upload one CSV file and one PDF file")

        os.makedirs("temp", exist_ok=True)
        
        with open(f"temp/{csv_file.filename}", "wb") as f:
            f.write(await csv_file.read())
        headers=load_data(f"temp/{csv_file.filename}").columns.tolist()
        
        pdf_file_path = f"temp/{pdf_file.filename}"
        with open(pdf_file_path, "wb") as f:
            f.write(await pdf_file.read())
        data_chunks=extract_data_chunks(pdf_file_path)
        print("Data chunks extracted")
        vector_store=get_document_embeddings(vector_store,data_chunks)
        print("Document embeddings extracted")
        rule_template=prompt_template("data_profiling_rules")
        print("Prompt template loaded")
        graph=build_graph()
        print("Graph built")
        result = graph.invoke(
            {"columns": headers,"vector_store": vector_store,"rule_template": rule_template, "llm": llm})

        print("Graph invoked")
        rules=process_llm_output(result["answer"].content)
        chatapp=workflow.create_workflow(rules,llm)
        # Combine responses
        return {
            "message": "Both files processed successfully",
            "generated_rules": rules
        }

    except Exception as e:
        return {"error": f"Failed to process files: {str(e)}"}


@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    print("file path", file_path)
    # Check if the file exists
    if not os.path.exists(file_path):
        print("not exixts")
        return {"error": "File not found!"}

    return FileResponse(file_path, media_type="text/csv", filename=filename)

@app.post("/auditCustomerData")
async def process_csv(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_FOLDER, file.filename)

        # Save the uploaded file before reading
        with open(file_path, "wb") as f:
            while chunk := await file.read(1024):  # Read in chunks of 1024 bytes
                f.write(chunk)
        print(f"File saved at: {file_path}")

        # Read the uploaded file
        #contents = await file.read()
        
        # Load the CSV into a pandas DataFrame
        #df = pd.read_csv(io.BytesIO(contents))
        df = pd.read_csv(file_path)
        
        # # Example: Perform some processing on the DataFrame
        print("CSV Data:")
        print(df.head())  # Print the first few rows of the DataFrame
        
        return {"message": "CSV processed successfully", "columns": df.columns.tolist()}
    except Exception as e:
        return {"error": f"Failed to process CSV: {str(e)}"}

@app.get("/getAnomalyDetection")
async def anomaly_detection():
    file_path = os.path.join(UPLOAD_FOLDER, "H1_5000.csv")
    data = pd.read_csv(file_path)
    unique_id_columns = ['Customer ID', 'Internal Obligor ID']  # Add all unique ID columns
    relevant_columns = unique_id_columns + [
        'Loan Amount', 'Outstanding Balance', 'Interest Rate', 'Total Assets',
        'Total Liabilities', 'EBITDA', 'Net Income', 'Total Revenue', 'Total Equity',
        'Cash Flow', 'Loan to Value Ratio', 'Debt Service Coverage Ratio',
        'Interest Coverage Ratio', 'Loan Default Probability'
    ]

    # Select relevant columns
    data = data[relevant_columns]

    # Fill missing values (example: fill with mean)
    data_filled = data.fillna(data.drop(columns=unique_id_columns).mean())

    # Scale numerical features (excluding unique IDs)
    scaler = StandardScaler()
    scaled_data = scaler.fit_transform(data_filled.drop(columns=unique_id_columns))

    # Perform anomaly detection
    iso_forest = IsolationForest(contamination=0.05, random_state=42)
    anomalies_iso = iso_forest.fit_predict(scaled_data)

    # Add anomaly flags to the dataset
    data_filled['Anomaly_ISO'] = anomalies_iso

    # Extract anomalies
    anomalies_iso_data = data_filled[data_filled['Anomaly_ISO'] == -1]
    risk_scoring_data = data_filled[data_filled['Anomaly_ISO'] == 1]
    print("anomaly data", anomalies_iso_data[:100])

    # Save anomalies with unique IDs
    file_path_for_data_with_anomalies = os.path.join(UPLOAD_FOLDER, "anomalies_data.csv")
    anomalies_iso_data.to_csv(file_path_for_data_with_anomalies, index=False)

    #save data without anomalies for risk scoring 
    file_path_for_data_without_anomalies = os.path.join(UPLOAD_FOLDER, "data_for_risk_scoring.csv")
    risk_scoring_data.to_csv(file_path_for_data_without_anomalies, index=False)


    return {"message": "CSV processed successfully", "filename": "anomalies_data.csv"}

@app.post("/refineRules")
def refineRules(input_data: TextInput):
    global rules, chatapp
    try:
        if rules is None:
            raise HTTPException(status_code=400, detail="Please generate rules first")
        input_text = input_data.text  # Extract the input string
        context_prompt = f'''
"You have a set of data profiling rules for certain columns. "
{input_text}
If the user request changes update and return all the rules along with unupdated ones.
'''
        input_messages = [HumanMessage(context_prompt)]
        output = chatapp.invoke({"messages": input_messages}, {"configurable": {"thread_id": "abc123"}})
        response_text = output["messages"][-1].content
        return {"message": "Text refined successfully", "refined_text": response_text}
    except Exception as e:
        return {"error": f"Failed to refine text: {str(e)}"}

@app.get("/downloadFlaggedFile")
async def download_file():
    file_path = "./temp/violations_output.xlsx"
    if os.path.exists(file_path):
        return FileResponse(path=file_path, filename="violations_output.xlsx", media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    else:
        raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)