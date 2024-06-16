#Importar FastAPI
from fastapi import FastAPI
from backend.config.settings import settings

#Importamos las rutas de la API
from backend.controllers.DiseaseController import router as DiseaseController
from backend.controllers.SymptomController import router as SymptomController

#Crear la aplicación FastAPI con los metadatos de la API
app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version
    
)

#Añadir las rutas de la API
app.include_router(DiseaseController)
app.include_router(SymptomController)

@app.get("/", tags=["Root"])
def read_root():
    return {"Hello": "World"}

