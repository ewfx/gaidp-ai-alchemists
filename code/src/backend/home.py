import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from fastapi import FastAPI, File, UploadFile,HTTPException
import uvicorn
import io
from PyPDF2 import PdfReader 
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel  # Import BaseModel from Pydantic
from utils.utils import load_llm,load_data,get_column_names,extract_data_chunks,load_vector_store,get_document_embeddings,prompt_template,process_llm_output
from langchain_ollama import OllamaEmbeddings
import os
from dotenv import load_dotenv
from rule_generation_pipeline.graph_setup import build_graph
from chat_pipeline import workflow
from langchain_core.messages import HumanMessage


load_dotenv()

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

@app.on_event("startup")
def startup_event():
    print("Loading models...")
    global llm, vector_store,embedding_model 
    embedding_model=OllamaEmbeddings(model="nomic-embed-text")
    llm=load_llm("google","gemini-2.0-flash-lite",api_key=os.getenv("GOOGLE_API_KEY") )
    vector_store=load_vector_store(embedding_model)

@app.get("/getFlaggedCustomers")
async def getFlaggedCustomers():
    pass

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

class TextInput(BaseModel):
    text: str

@app.post("/refineRules")
def refineRules(input_data: TextInput):
    global rules, chatapp
    try:
        if rules is None:
            raise HTTPException(status_code=400, detail="Please generate rules first")
        input_text = input_data.text  # Extract the input string
        input_messages = [HumanMessage(input_text)]
        output = chatapp.invoke({"messages": input_messages}, {"configurable": {"thread_id": "abc123"}})
        response_text = output["messages"][-1].content
        return {"message": "Text refined successfully", "refined_text": response_text}
    except Exception as e:
        return {"error": f"Failed to refine text: {str(e)}"}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)