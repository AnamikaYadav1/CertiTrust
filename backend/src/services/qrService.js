// src/services/qrService.js
import QRCode from "qrcode";
import { signPayload, verifySignature } from "../utils/sign.js";

export async function generateQR(data) {
  const payload = { ...data };
  payload.signature = signPayload(payload);
  const dataUrl = await QRCode.toDataURL(JSON.stringify(payload));
  return { dataUrl, payload };
}

export function verifyQRContent(qrString) {
  try {
    const parsed =
      typeof qrString === "string" ? JSON.parse(qrString) : qrString;

    const signature = parsed.signature;
    delete parsed.signature;

    const ok = verifySignature(parsed, signature);
    return { valid: ok, parsed };
  } catch (e) {
    return { valid: false, error: e.message };
  }
}
