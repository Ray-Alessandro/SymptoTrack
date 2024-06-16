import json
import os
from fastapi import HTTPException

#Importamos las clases que vamos a utilizar
from backend.models.request.DiseaseRequest import DiseaseRequest
from backend.models.response.DiseaseResponse import DiseaseResponse
from backend.models.response.SymptomResponse import SymptomResponse

#Importamos para usar listas
from typing import List

#Importamos las funciones que vamos a utilizar
from data.dataframe import load_dataframe
from graph.create_graph import *
from algorithm.inference import *

def get_diagnosis(disease: DiseaseRequest) :
    # Cargar los datos
    dataframe = load_dataframe()
    G = create_graph(dataframe)
    
    # Calcular las probabilidades
    diagnosis_values, diagnosis_probs, symptom_probs = calculate_probabilities(dataframe)
    
    # Lista de síntomas
    symptom_list = [symptom.name for symptom in disease.symptoms]
    
    # Validar síntomas ingresados
    if not validate_symptoms(symptom_list):
        raise HTTPException(status_code=400, detail="Síntomas no válidos. Por favor, verifique los síntomas ingresados.")
    
    evidence = symptoms_to_evidence(symptom_list)
    
    # Inferir diagnóstico
    diagnosis_fallback_result = infer_diagnosis_with_fallback(evidence, diagnosis_values, diagnosis_probs, symptom_probs)
    

    print("Diagnósticos más probables: ", diagnosis_fallback_result)
    
    
    return symptoms_by_disease(diagnosis_fallback_result, G)

#Logica de negocio

def symptoms_by_disease(diagnosis_list, G) -> List[DiseaseResponse]:
    diagnosis_response: List[DiseaseResponse] = []

    for item in diagnosis_list:
        diagnosis = item[0]
        symptoms = calculate_symptoms_given_diagnosis(diagnosis, G)
        print(f"Síntomas asociados con {diagnosis}: {symptoms}")
        
        new_diagnosis = add_diagnosis(item, symptoms)
        print(new_diagnosis)
        diagnosis_response.append(new_diagnosis)
    
    return diagnosis_response


def add_diagnosis(diagnosis, symptoms) -> DiseaseResponse:
    diagnosis_response = DiseaseResponse(
        name=diagnosis[0],
        description=get_disease_details(diagnosis[0])["descripcion"],
        percentage=diagnosis[1],
        image=get_disease_details(diagnosis[0])["imagen"],
        symptoms=[]
    )
    
    # Añadir síntomas al diagnóstico
    diagnosis_response = add_symptoms_to_diagnosis(symptoms, diagnosis_response)
    
    return diagnosis_response 


def add_symptoms_to_diagnosis(symptoms, diagnosis_response: DiseaseResponse) -> DiseaseResponse:
    #Añade los síntomas a una respuesta de enfermedad.
    for symptom in symptoms:
        symptom_response = SymptomResponse(
            name=symptom,
            description=get_symptom_details(symptom)["descripcion"],
            image=get_symptom_details(symptom)["imagen"]
        )
        diagnosis_response.symptoms.append(symptom_response)
    return diagnosis_response

#Obtención de datos de síntomas:
# Ruta al archivo JSON
SYMPTOM_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),'..', 'shared', 'data', 'symptom.json'))

def load_symptom_data():
    """Carga los datos de síntomas desde el archivo JSON"""
    with open(SYMPTOM_FILE_PATH, 'r', encoding='utf-8') as file:
        return json.load(file)
    
def get_symptom_details(name: str):
    """Obtiene los detalles del síntoma desde el archivo JSON"""
    symptom_data = load_symptom_data()
    if name in symptom_data:
            return symptom_data[name]
    else:
            return {"descripcion": "Descripción no disponible", "imagen": "Imagen no disponible"}
        
#Obtención de datos de enfermedades:
# Ruta al archivo JSON
DISEASE_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),'..', 'shared', 'data', 'disease.json'))

def load_disease_data():
    """Carga los datos de enfermedades desde el archivo JSON"""
    with open(DISEASE_FILE_PATH, 'r', encoding='utf-8') as file:
        return json.load(file)
    
def get_disease_details(name: str):
    """Obtiene los detalles de la enfermedad desde el archivo JSON"""
    disease_data = load_disease_data()
    if name in disease_data:
            return disease_data[name]
    else:
            return {"descripcion": "Descripción no disponible", "imagen": "Imagen no disponible"}
        
def validate_symptoms(symptoms):
    """Valida que los síntomas ingresados existan en la base de datos, en caso contrario manda un mensaje de error"""
    symptom_data = load_symptom_data()
    for symptom in symptoms:
        if symptom not in symptom_data:
            return False
    return True