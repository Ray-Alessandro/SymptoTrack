from fastapi import APIRouter
from backend.models.request.DiseaseRequest import DiseaseRequest
from backend.models.response.DiseaseResponse import DiseaseResponse
from typing import List

#Importamos el servicio que vamos a utilizar
from backend.services.DiseaseService import get_diagnosis

router = APIRouter()

@router.post("/disease", tags=["Disease Controller"], response_model=List[DiseaseResponse])
async def prognosis(disease: DiseaseRequest):
    return get_diagnosis(disease)