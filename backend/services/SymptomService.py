import json
import os
from fastapi import HTTPException

from typing import List


def get_symptoms()-> List[str]:
    symptom_data = load_symptom_data()
    
    return list(symptom_data.keys())



#Obtención de datos de síntomas:
# Ruta al archivo JSON
SYMPTOM_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__),'..', 'shared', 'data', 'symptom.json'))

def load_symptom_data():
    """Carga los datos de síntomas desde el archivo JSON"""
    with open(SYMPTOM_FILE_PATH, 'r', encoding='utf-8') as file:
        return json.load(file)