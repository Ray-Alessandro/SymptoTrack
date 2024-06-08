from fastapi import APIRouter
from backend.models.request.DiseaseRequest import DiseaseRequest

#Importamos las funciones que vamos a utilizar
from data.dataframe import load_dataframe
from graph.create_graph import *
from algorithm.inference import *

router = APIRouter()

@router.post("/disease", tags=["Disease Controller"])
def prognosis(disease: DiseaseRequest):
    # Cargar los datos
    dataframe = load_dataframe()
    
    # Calcular las probabilidades
    diagnosis_values, diagnosis_probs, symptom_probs = calculate_probabilities(dataframe)
    
    # Lista de síntomas
    symptom_list = [symptom.name for symptom in disease.symptoms]
    evidence = symptoms_to_evidence(symptom_list)
    
    # Inferir diagnóstico
    diagnosis_fallback_result = infer_diagnosis_with_fallback(evidence, diagnosis_values, diagnosis_probs, symptom_probs)

    print("Diagnósticos más probables: ", diagnosis_fallback_result)
    
    return {"message": "Diagnóstico de enfermedades"}