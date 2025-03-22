import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from fastapi import FastAPI, File, UploadFile
import uvicorn
import io
from PyPDF2 import PdfReader 
from fastapi.middleware.cors import CORSMiddleware
from docx import Document  # For processing Word documents
from pydantic import BaseModel  # Import BaseModel from Pydantic

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],  # Replace with your frontend's URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/getFlaggedCustomers")
async def getFlaggedCustomers():
    pass

@app.post("/auditCustomerData")
async def process_csv(file: UploadFile = File(...)):
    try:
        # Read the uploaded file
        contents = await file.read()
        
        # Load the CSV into a pandas DataFrame
        df = pd.read_csv(io.BytesIO(contents))
        
        # Example: Perform some processing on the DataFrame
        print("CSV Data:")
        print(df.head())  # Print the first few rows of the DataFrame
        
        # Example: Return the column names as a response
        return {"message": "CSV processed successfully", "columns": df.columns.tolist()}
    except Exception as e:
        return {"error": f"Failed to process CSV: {str(e)}"}
    
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