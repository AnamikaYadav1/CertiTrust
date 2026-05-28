from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

app = FastAPI()

class Tx(BaseModel):
    user_id: str = None
    amount: float = 0.0
    merchant_id: str = None
    country: str = None
    timestamp: str = None

@app.post('/predict')
def predict(tx: Tx):
    score = 0.01
    if tx.amount > 1000:
        score += 0.6
    elif tx.amount > 200:
        score += 0.2

    if tx.country and tx.country.lower() not in ['india', 'in', 'usa', 'us']:
        score += 0.15

    probability = min(1.0, score)
    label = "fraud" if probability > 0.5 else "allow"

    return {
        "probability": probability,
        "label": label
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5005)

