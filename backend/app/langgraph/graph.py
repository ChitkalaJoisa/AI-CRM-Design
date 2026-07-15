from langgraph.graph import StateGraph, END

from app.langgraph.state import AgentState
from app.langgraph.nodes import detect_intent
from app.langgraph.router import router

from app.langgraph.tools import (
    log_interaction_tool,
    edit_interaction_tool
)

workflow = StateGraph(AgentState)

workflow.add_node(
    "detect_intent",
    detect_intent
)

workflow.add_node(
    "log",
    log_interaction_tool
)

workflow.add_node(
    "edit",
    edit_interaction_tool
)

workflow.set_entry_point(
    "detect_intent"
)

workflow.add_conditional_edges(
    "detect_intent",router,
    {
        "log": "log",
        "edit": "edit"
    }
)

workflow.add_edge("log", END)
workflow.add_edge("edit", END)

graph = workflow.compile()