from fastapi import APIRouter
from typing import List

#Importamos el servicio que vamos a utilizar
from backend.services.SymptomService import get_symptoms

router = APIRouter()

@router.get("/symptoms", tags=["Symptom Controller"])
async def symptoms():
    return get_symptoms()