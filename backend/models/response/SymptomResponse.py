from pydantic import BaseModel

class SymptomResponse(BaseModel):
    name: str
    description: str
    image: str