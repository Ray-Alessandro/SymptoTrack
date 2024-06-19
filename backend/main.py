#Importar FastAPI
from fastapi import FastAPI
from backend.config.settings import settings
from fastapi.middleware.cors import CORSMiddleware

#Importamos las rutas de la API
from backend.controllers.DiseaseController import router as DiseaseController
from backend.controllers.SymptomController import router as SymptomController

#Crear la aplicación FastAPI con los metadatos de la API
app = FastAPI(
    title=settings.app_name,
    description=settings.app_description,
    version=settings.app_version
    
)

#Añadir los origenes permitidos para CORS
origins = [
    "http://localhost",
    "http://localhost:5173",
]


#Añadir los origenes permitidos para CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Añadir las rutas de la API
app.include_router(DiseaseController)
app.include_router(SymptomController)

@app.get("/", tags=["Root"])
def read_root():
    return {"Hello": "World"}

