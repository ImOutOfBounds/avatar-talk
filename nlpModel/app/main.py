from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
from transformers import pipeline

app = FastAPI(title="Car Sales AI Agent")

# ----------------------------
# Configuração do CORS
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000"] para restringir
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Caminho do JSON
# ----------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
json_path = os.path.join(BASE_DIR, "cars.json")  # se cars.json estiver na mesma pasta que main.py

with open(json_path, "r", encoding="utf-8") as f:
    cars = json.load(f)

# ----------------------------
# Modelo de NLP para classificação
# ----------------------------
classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

labels_price = ["cheap", "expensive", "medium"]
labels_location = [c["Location"] for c in cars]

# ----------------------------
# Schema do input
# ----------------------------
class UserInput(BaseModel):
    text: str

# ----------------------------
# Função para extrair filtros com IA
# ----------------------------
def extract_filters(text: str):
    filters = {}

    # Preço
    price_result = classifier(text, candidate_labels=labels_price)
    top_price = price_result["labels"][0]
    if price_result["scores"][0] > 0.5:
        filters["price"] = top_price

    # Localização
    location_result = classifier(text, candidate_labels=labels_location)
    top_loc = location_result["labels"][0]
    if location_result["scores"][0] > 0.5:
        filters["location"] = top_loc

    return filters

# ----------------------------
# Função de filtro
# ----------------------------
def filter_cars(filters):
    result = cars

    # Localização
    if "location" in filters:
        result = [c for c in result if c["Location"] == filters["location"]]

    # Preço
    if "price" in filters:
        if filters["price"] == "cheap":
            result = sorted(result, key=lambda x: x["Price"])
        elif filters["price"] == "expensive":
            result = sorted(result, key=lambda x: x["Price"], reverse=True)

    return result[:3]

# ----------------------------
# Endpoint
# ----------------------------
@app.post("/recommend")
def recommend_car(input: UserInput):
    filters = extract_filters(input.text)
    
    if not filters:
        return {"input": input.text, "response": "Não entendi o que você quis dizer."}

    recommendations = filter_cars(filters)
    if not recommendations:
        return {"input": input.text, "response": "Não encontrei carros que correspondam aos seus critérios."}

    response_text = "Aqui estão algumas opções:\n"
    for car in recommendations:
        response_text += f"- {car['Name']} {car['Model']} em {car['Location']} por R${car['Price']}\n"

    return {"input": input.text, "filters": filters, "recommendations": recommendations, "response": response_text}
