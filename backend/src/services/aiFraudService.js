// src/services/aiFraudService.js
import axios from "axios";

export async function fraudScore(transaction) {
  const AI_URL = process.env.AI_FRAUD_URL || "http://localhost:5005/predict"; 
  // If your fraud microservice runs on 5001, change to 5001

  const res = await axios.post(AI_URL, transaction, { timeout: 7000 });
  return res.data;
}
