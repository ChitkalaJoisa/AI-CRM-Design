from pydantic import BaseModel
from typing import Optional
class InteractionCreate(BaseModel):
    message:str
class InteractionResponse(BaseModel):
    id:int
    summary:str
