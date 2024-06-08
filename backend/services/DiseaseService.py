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
        description="description disease",
        percentage=diagnosis[1],
        image="www.google.com",
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
            description="description symptom",
            image="www.google.com"
        )
        diagnosis_response.symptoms.append(symptom_response)
    return diagnosis_response