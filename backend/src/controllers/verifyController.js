import { verifyCertificate } from "../services/blockchainService.js";

export async function verify(req, res) {
  try {
    const { certId } = req.params;
    const cert = await verifyCertificate(certId);
    res.status(200).json(cert);
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
}
