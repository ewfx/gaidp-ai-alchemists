from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_ollama import OllamaLLM
import pandas as pd
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_core.vectorstores import InMemoryVectorStore
from langchain.prompts import PromptTemplate
from openpyxl import Workbook, load_workbook
from openpyxl.styles import PatternFill
from openpyxl.comments import Comment
import io
import re

def load_llm(model_type,model_name,api_key=None):
    if model_type.lower()=="google":
        return ChatGoogleGenerativeAI(model=model_name,api_key=api_key)
    elif model_type.lower()=="ollama":
        return OllamaLLM(model=model_name)
    else:
        raise ValueError("Unsupported model type. Choose 'google' or 'ollama'.")
        
def load_data(file_path):
    return pd.read_csv(file_path)
    
def get_column_names(data):
    return data.columns.tolist()

def extract_data_chunks(pdf_path):
    #load the pdf file
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    
    # Define chunking parameters
    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=4000,  # Size of each chunk
    chunk_overlap=400  # Overlap between chunks to preserve context
    )
    return text_splitter.split_documents(documents=documents)

def load_vector_store(embedding_model):
    return InMemoryVectorStore(embedding_model)
    
def get_document_embeddings(vector_store, document_chunks):
    _ = vector_store.add_documents(documents=document_chunks)
    return vector_store
    
def prompt_template(type):
    if(type=="data_profiling_rules"):
        return PromptTemplate(
    input_variables=["column"],
    template="""
    For the columns '{column}', generate a data profiling rule that ensures data quality and consistency based on the regulations found in {context}.
    Ensure the rule accounts for business exceptions where applicable.
    
    Example rules:
    1) Transaction_Amount should always match Reported_Amount, except when the transaction involves cross-currency conversions, in which case a permissible deviation of up to 1% is allowed.
    2) Account_Balance should never be negative, except in cases of overdraft accounts explicitly marked with an "OD" flag.
    3) Currency should be a valid ISO 4217 currency code, and the transaction must adhere to cross-border transaction limits as per regulatory guidelines.
    4) Country should be an accepted jurisdiction based on bank regulations, and cross-border transactions should include mandatory transaction remarks if the amount exceeds $10,000.

    Now generate profiling  rules only for the columns mentioned in'{column}'  based on  {context}. Number the columns sequentially. Give as a plain text without any formatting.  
    Output Format : 
    Here are the data profiling rules for the columns :
    Column Name : Rules for the column
    
    Example :
    
    1) Transaction_Amount - should always match Reported_Amount, except when the transaction involves cross-currency conversions, in which case a permissible deviation of up to 1% is allowed.
    2) Account_Balance - should never be negative, except in cases of overdraft accounts explicitly marked with an "OD" flag.
    
    """
    )

def process_llm_output(raw_data):
    # Split based on numbered sections
    sections = re.split(r'(\d+\))', raw_data)
    # Process each section
    formatted_output = []
    for i in range(1, len(sections), 2):
        header = sections[i].strip()
        content = sections[i+1].strip().replace('*', '-').replace('\n', '\n    ')
        formatted_output.append(f"{header} {content}")
    # Join everything into a clean output
    return '\n\n'.join(formatted_output)
    
def parse_violations(text):
    violations = re.findall(r"Violation: (.+?)\nRemediation: (.+?)\n", text)
    violation_exists = re.search(r"violation_exists: (\w+)", text).group(1)
    risk_score = re.search(r"risk_score: (\d+)", text).group(1)
    return{
    "violations_data": [{"violation": v[0], "remediation": v[1]} for v in violations],
    "violation_exists": violation_exists.lower() == "true",
    "risk_score": risk_score
}
    
def store_violations(df, responses, folder):
    print("Generating Excel file with highlighted violations and comments for all rows...")
    df.to_excel(f"{folder}/violations_output.xlsx", index=False)
    wb = load_workbook(f"{folder}/violations_output.xlsx")
    ws = wb.active
    red_fill = PatternFill(start_color='FF0000', end_color='FF0000', fill_type='solid')

    for response in responses:
        row_idx = response['row_index']
        violation = response['violations_data']['violations_data'][0]['violation']
        remediation = response['violations_data']['violations_data'][0]['remediation']

        if response['violations_data']['violation_exists']:
            # Color the entire row red
            for col_num in range(1, len(df.columns) + 1):
                cell = ws.cell(row=row_idx + 1, column=col_num)
                cell.fill = red_fill
                print("cell filled")

            # Add a comment with the single violation and remediation
            comment_text = f"Violation: {violation}\nRemediation: {remediation}"
            first_cell = ws.cell(row=row_idx + 1, column=1)
            first_cell.comment = Comment(comment_text, "CheckerBot")

    wb.save(f"{folder}/violations_output.xlsx")
    print("Excel file generated with highlighted violations and comments for all rows!")


    
    