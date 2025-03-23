from langchain_core.documents import Document
from typing_extensions import List, TypedDict
class State(TypedDict):
    columns:list
    context: List[Document]
    answer: str
    vector_store: object
    llm: object
    rule_template: object