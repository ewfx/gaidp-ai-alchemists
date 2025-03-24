from langgraph.graph import START, StateGraph
from .retrieve import retrieve
from .generate import generate
from .state import State

def build_graph():
    graph_builder = StateGraph(State).add_sequence([retrieve, generate])
    graph_builder.add_edge(START, "retrieve")
    return graph_builder.compile()
