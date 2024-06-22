import numpy as np
from collections import deque

# Calcular las probabilidades condicionales para cada síntoma dado el diagnóstico
def calculate_probabilities(dataframe):
    data = dataframe.to_numpy()

    # Obtener valores únicos de diagnóstico y sus conteos
    diagnosis_values, diagnosis_counts = np.unique(data[:, -1], return_counts=True)
    diagnosis_probs = diagnosis_counts / diagnosis_counts.sum()

    # Calcular las probabilidades condicionales para cada síntoma dado el diagnóstico
    symptom_probs = {}
    diagnosis_indices = {diag: np.where(data[:, -1] == diag)[0] for diag in diagnosis_values}
    
    for symptom in dataframe.columns[:-1]:  # Excluyendo "prognosis"
        symptom_idx = dataframe.columns.get_loc(symptom)
        symptom_given_diagnosis = np.zeros((2, len(diagnosis_values)))
        
        for j, diag in enumerate(diagnosis_values):
            diag_indices = diagnosis_indices[diag]
            symptom_values = data[diag_indices, symptom_idx]
            
            # Probabilidad de no tener el síntoma (valor 0)
            symptom_given_diagnosis[0, j] = np.mean(symptom_values == 0)
            # Probabilidad de tener el síntoma (valor 1)
            symptom_given_diagnosis[1, j] = np.mean(symptom_values == 1)
        
        symptom_probs[symptom] = symptom_given_diagnosis

    return diagnosis_values, diagnosis_probs, symptom_probs

# Función para hacer inferencias simples
def infer_diagnosis(evidence, diagnosis_values, diagnosis_probs, symptom_probs):
    posterior_probs = np.copy(diagnosis_probs)
    for symptom, value in evidence.items():
        if symptom in symptom_probs:
            posterior_probs *= symptom_probs[symptom][value]
    total_probability = posterior_probs.sum()
    if total_probability != 0:
        posterior_probs /= total_probability  # Normalizar
    else:
        return {}  # Devolver un diccionario vacío si no hay probabilidades válidas
    return dict(zip(diagnosis_values, posterior_probs))


# Función para calcular los síntomas dados un diagnóstico utilizando BFS
def calculate_symptoms_given_diagnosis(diagnosis, G):
    possible_symptoms = set()
    visited = set()
    queue = deque([diagnosis])

    while queue:
        current_diagnosis = queue.popleft()
        visited.add(current_diagnosis)

        # Obtener síntomas asociados con el diagnóstico actual
        symptoms = set(G.successors(current_diagnosis)) - visited
        possible_symptoms.update(symptoms)

        # Agregar diagnósticos asociados con los síntomas a la cola
        queue.extend(symptoms)

    return possible_symptoms

# Función para obtener los diagnósticos más probables dada la evidencia
def top_diagnoses(evidence, diagnosis_values, diagnosis_probs, symptom_probs, top_n=4):
    query_result = infer_diagnosis(evidence, diagnosis_values, diagnosis_probs, symptom_probs)
    # Filtrar los diagnósticos con probabilidad mayor a 0%
    filtered_diagnoses = {k: v for k, v in query_result.items() if v > 0}
    sorted_diagnoses = sorted(filtered_diagnoses.items(), key=lambda item: item[1], reverse=True)
    return sorted_diagnoses[:top_n]

# Función para hacer inferencias con reducción gradual de síntomas
def infer_diagnosis_with_fallback(evidence, diagnosis_values, diagnosis_probs, symptom_probs, min_symptoms=1, top_n=4):
    evidence_items = list(evidence.items())
    
    if len(evidence_items) == 1 :
        return top_diagnoses(evidence, diagnosis_values, diagnosis_probs, symptom_probs, top_n)
    
    
    for num_symptoms in range(len(evidence_items), min_symptoms - 1, -1):
        partial_evidence = dict(evidence_items[:num_symptoms])
        top_diagnoses_result = top_diagnoses(partial_evidence, diagnosis_values, diagnosis_probs, symptom_probs, top_n)
        if top_diagnoses_result:
            # Si llegamos al mínimo de síntomas, devolver solo un diagnóstico por síntoma relevante
            if num_symptoms == 1:
                diagnoses = []
                for symptom in evidence_items:
                    symptom_evidence = symptoms_to_evidence([symptom[0]])
                    diagnose_by_symptom = top_diagnoses(symptom_evidence, diagnosis_values, diagnosis_probs, symptom_probs, 1)
                    diagnose_chosen = diagnose_by_symptom[0] if diagnose_by_symptom else []          
                 
                    # Modificar el porcentaje del diagnóstico elegido
                    percentage = 1.0 / len(evidence_items)
                    new_diagnose = (diagnose_chosen[0], percentage)
                    
                    # Agregar el diagnóstico modificado a la lista de diagnósticos
                    diagnoses.append(new_diagnose)
                
                # Sumar las probabilidades de diagnósticos iguales
                final_diagnoses = {}
                for diagnose in diagnoses:
                    if diagnose[0] in final_diagnoses:
                        final_diagnoses[diagnose[0]] += diagnose[1]
                    else:
                        final_diagnoses[diagnose[0]] = diagnose[1]
                    #Si existen 2 diagnósticos iguales, se suman sus probabilidades
                    
                # Convertir el diccionario de diagnósticos finales en una lista de tuplas
                final_diagnoses_list = [(key, value) for key, value in final_diagnoses.items()]
                
                return final_diagnoses_list
            
            else:
                return top_diagnoses_result
    return []

# Función para convertir una lista de síntomas en un diccionario de evidencia
def symptoms_to_evidence(symptoms):
    return {symptom: 1 for symptom in symptoms}