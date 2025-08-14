from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(request: ChatRequest):
    user_message = request.message
    response = f"Resposta automática para: {user_message}"
    return {"response": response}
