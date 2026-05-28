import { generateQR, verifyQRContent } from "../services/qrService.js";

export const generate = async (req, res) => {
  try {
    const payload = req.body;
    const qr = await generateQR(payload);
    res.json({ success: true, qr });
  } catch (e) {
    console.error("qr.generate error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
};

export const verify = async (req, res) => {
  try {
    const { content } = req.body; // JSON string from QR scan
    const result = verifyQRContent(content);
    res.json({ success: true, result });
  } catch (e) {
    console.error("qr.verify error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
};
