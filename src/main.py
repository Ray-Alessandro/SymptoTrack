import threading
from data.dataframe import load_dataframe
from graph.create_graph import *
from algorithm.inference import *

# Función para manejar el gráfico en un hilo separado
def graph_thread(dataframe):
    G = create_graph(dataframe)
    draw_graph(G)


# Cargar los datos
dataframe = load_dataframe()

# Crear y empezar el hilo para el gráfico
thread = threading.Thread(target=graph_thread, args=(dataframe,))
thread.start()

# Calcular las probabilidades
diagnosis_values, diagnosis_probs, symptom_probs = calculate_probabilities(dataframe)

# Lista de síntomas
evidence = symptoms_to_evidence(['itching','skin_rash','dischromic _patches'])

# Inferir diagnóstico
diagnosis_fallback_result = infer_diagnosis_with_fallback(evidence, diagnosis_values, diagnosis_probs, symptom_probs)
print("Diagnósticos más probables: ", diagnosis_fallback_result)


# Obtener el diagnóstico con la probabilidad máxima
if diagnosis_fallback_result:
    diagnosticoSegunProbabilidadMaxima = diagnosis_fallback_result[0][0]
    # Obtener el grafo del hilo del gráfico (si es necesario)
    G = create_graph(dataframe)
    symptoms = calculate_symptoms_given_diagnosis(diagnosticoSegunProbabilidadMaxima, G)
    print(f"Síntomas asociados con {diagnosticoSegunProbabilidadMaxima}: {symptoms}")


# Esperar a que el hilo del gráfico termine antes de cerrar el script
thread.join()