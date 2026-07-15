from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.langgraph.graph import graph

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    current_data: dict = {}


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        result = graph.invoke(
    {
        "user_input": request.message,
        "intent": None,
        "extracted_data": request.current_data,
        "response": ""
    }
)

        return result

    except Exception as e:
        print("\n===== BACKEND ERROR =====")
        print(e)
        print("=========================\n")

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )