from langgraph.graph import MessagesState

def call_model(state: MessagesState, llm):
    response = llm.invoke(state["messages"])
    return {"messages": response}
