from langgraph.graph import START, MessagesState, StateGraph
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import HumanMessage
from chat_pipeline.call_model import call_model


def create_workflow(context_prompt, llm):  # Pass llm into the function
    config = {"configurable": {"thread_id": "abc123"}}
    
    workflow = StateGraph(state_schema=MessagesState)
    workflow.add_node("model", lambda state: call_model(state, llm))  # Pass llm via lambda
    workflow.add_edge(START, "model")

    # Set up memory and compile
    memory = MemorySaver()
    app = workflow.compile(checkpointer=memory)
    input_messages = [HumanMessage(context_prompt)]
    app.invoke({"messages": input_messages}, config)
    return app