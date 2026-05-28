from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import hashlib

app = FastAPI()

class Pair(BaseModel):
    img1: str
    img2: str

@app.post('/face/verify')
def verify(pair: Pair):
    try:
        h1 = hashlib.sha256(pair.img1.encode()).hexdigest()
        h2 = hashlib.sha256(pair.img2.encode()).hexdigest()
        match = (h1 == h2)
        score = 1.0 if match else 0.0
        
        return {
            "match": match,
            "score": score,
            "note": "placeholder face verifier (replace with DeepFace for real accuracy)"
        }
    except Exception as e:
        return {
            "match": False,
            "score": 0.0,
            "error": str(e)
        }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=6001)
