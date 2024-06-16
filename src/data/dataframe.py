import pandas as pd
import os

# Obtiene la ruta absoluta del directorio actual del script
current_dir = os.path.dirname(os.path.abspath(__file__))

# Instanciamos en una variable el dataset
dataframe_dir = os.path.join(current_dir, "data.csv")

def load_dataframe():
    # Instanciamos en una variable el dataset
    dataframe = pd.read_csv(dataframe_dir)
    # Limitar el DataFrame según la cantidad de registros
    dataframe = dataframe.head(1500)
    return dataframe