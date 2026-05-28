import { fraudScore } from "../services/aiFraudService.js";

export const checkFraud = async (req, res) => {
  try {
    const tx = req.body;
    const result = await fraudScore(tx);
    
    res.json({ success: true, result });
  } catch (err) {
    console.error("fraudController error:", err?.message || err);
    res.status(500).json({ success: false, error: err?.message || "Internal error" });
  }
};
