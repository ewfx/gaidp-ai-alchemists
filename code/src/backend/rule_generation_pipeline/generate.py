from .state import State
def generate(state: State):
    rule_template = state["rule_template"]
    llm = state["llm"]
    # Combine the content of all retrieved documents
    docs_content = "\n\n".join(doc.page_content for doc in state["context"])
    
    # Pass the columns as a comma-separated string
    messages = rule_template.invoke({"column": ", ".join(state["columns"]), "context": docs_content})
    
    response = llm.invoke(messages)
    return {"answer": response}
