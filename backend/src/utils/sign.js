// src/utils/sign.js
import crypto from "crypto";

const SECRET = process.env.QR_SIGN_SECRET || "qr-secret-change-this";

export function signPayload(obj) {
  // deterministic, stable key order
  const str = JSON.stringify(obj);
  return crypto.createHmac("sha256", SECRET).update(str).digest("hex");
}

export function verifySignature(obj, signature) {
  const expected = signPayload(obj);
  return expected === signature;
}
