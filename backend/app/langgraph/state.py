from typing import TypedDict, Optional, List

class AgentState(TypedDict):
    user_input: str
    intent: Optional[str]

    extracted_data: dict

    response: str