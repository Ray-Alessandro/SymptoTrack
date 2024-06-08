from pydantic import BaseModel
from typing import List

from .SymptomResponse import SymptomResponse


class DiseaseResponse(BaseModel):
    name: str
    description: str
    image: str
    percentage: float
    symptoms: List[SymptomResponse]