from pydantic import BaseModel
from typing import List
from .SymptomRequest import SymptomRequest

class DiseaseRequest(BaseModel):
    symptoms: List[SymptomRequest]