from pydantic import BaseModel

class SymptomRequest(BaseModel):
    name: str
