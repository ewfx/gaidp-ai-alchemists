from .state import State
def retrieve(state: State):
    retrieved_docs = []
    vector_store = state["vector_store"]
    # Loop through each column and retrieve relevant docs
    for column in state["columns"]:
        docs = vector_store.similarity_search(f"{column}")
        retrieved_docs.extend(docs)
    return {"context": retrieved_docs}
