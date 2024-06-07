from graph.create_graph import *
from data.dataframe import *

# Cargar los datos
dataframe = load_dataframe()

G = create_graph(dataframe)
draw_graph(G)