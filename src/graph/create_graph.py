import networkx as nx
import matplotlib.pyplot as plt

def create_graph(dataframe):
    G = nx.DiGraph()

    # Agregar nodos y aristas al grafo
    for _, row in dataframe.iterrows():
        enfermedad = row["prognosis"]
        sintomas = [col for col, value in row.items() if value == 1 and col != "prognosis"]

        # Agregar enfermedad como nodo
        G.add_node(enfermedad, tipo="enfermedad")

        # Agregar síntomas como nodos y conexiones
        for sintoma in sintomas:
            G.add_node(sintoma, tipo="sintoma")
            G.add_edge(enfermedad, sintoma)

    return G

def draw_graph(G):
    # Habilitar el modo interactivo
    #plt.ion()

    # Definir los colores de los nodos de enfermedades y síntomas
    colors = ['lightblue' if data['tipo'] == 'enfermedad' else 'lightgreen' for node, data in G.nodes(data=True)]

    # Graficar el grafo con nodos coloreados
    plt.figure(figsize=(15, 10))
    nx.draw(G, with_labels=True, font_weight='bold', node_size=1600, node_color=colors, edge_color='gray', font_size=6)
    plt.title("Relaciones entre enfermedades y síntomas")
    plt.show()