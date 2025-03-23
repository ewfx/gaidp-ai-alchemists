import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from fastapi import FastAPI, File, UploadFile
import uvicorn
import io
from PyPDF2 import PdfReader 
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
# from docx import Document  # For processing Word documents
from pydantic import BaseModel  # Import BaseModel from Pydantic
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import IsolationForest
# from sklearn.neighbors import LocalOutlierFactor
# from sklearn.svm import OneClassSVM
# import matplotlib.pyplot as plt
# import seaborn as sns
import os 
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

UPLOAD_FOLDER = "../regulatory_files"  # Directory to store uploaded files
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the folder exists

@app.get("/getFlaggedCustomers")
async def getFlaggedCustomers():
    pass

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

class RuleRequest(BaseModel):
    text: str

@app.post("/refineRules")
async def refineRules(request:RuleRequest):
    try:
        input_text = request.text  # Extract the input string
        print(f"Received text: {input_text}")

        # Example: Perform some processing on the input text
        refined_text = input_text.upper()  # Example transformation (convert to uppercase)

        # Return the refined text
        return {"message": "Text refined successfully", "refined_text": refined_text}
    except Exception as e:
        return {"error": f"Failed to refine text: {str(e)}"}

@app.post("/generateRules")
async def generateRules(file: UploadFile = File(...)):
    contents = await file.read()
    file_extension = file.filename.split('.')[-1].lower()  # Get the file extension

    try:
        text = ""

        if file_extension == "pdf":
            # Process PDF files
            pdf_reader = PdfReader(io.BytesIO(contents))
            for page in pdf_reader.pages:
                text += page.extract_text()

        elif file_extension in ["doc", "docx"]:
            # Process Word documents
            doc = Document(io.BytesIO(contents))
            for paragraph in doc.paragraphs:
                text += paragraph.text + "\n"

        elif file_extension in ["txt"]:
            # Process plain text files
            text = contents.decode("utf-8")

        else:
            return {"error": f"Unsupported file type: {file_extension}"}

        
        # Example: Print the extracted text
        print(text)
        
        # You can now process the extracted text to generate rules
        return {"message": "Rules generated successfully"}  # Return a snippet of the text
        # return {"message": "Rules generated successfully", "extracted_text": text[:500]}  # Return a snippet of the text
    except Exception as e:
        return {"error": f"Failed to process PDF: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)