import { uploadToIPFS } from "../services/ipfsService.js";
import { issueCertificate } from "../services/blockchainService.js";
import {
  saveCertificate,
  getAllCertificates,
  getCertificate,
} from "../services/firebaseService.js";

// POST /issue
export async function issue(req, res) {
  try {
    const { studentAddr, name, issuer } = req.body;
    const file = req.file;

    if (!file)
      return res.status(400).json({ error: "No file uploaded" });

    // 1️⃣ Upload to IPFS
    const ipfsHash = await uploadToIPFS(file.buffer, file.originalname);
    console.log("✅ File uploaded to IPFS:", ipfsHash);

    // 2️⃣ Whitelist backend wallet (ignore if already done)
    try {
      await whitelistIssuer();
    } catch (err) {
      console.log("Skipping whitelist if already done:", err.message);
    }

    // 3️⃣ Issue certificate on blockchain (returns txHash and certId)
    const { txHash, certId } = await issueCertificate(studentAddr, ipfsHash);
    console.log("✅ Blockchain certificate ID:", certId);

    // 4️⃣ Save metadata in Firebase
    const docId = await saveCertificate({
      name,
      issuer,
      studentAddr,
      ipfsHash,
      txHash: txHash || "N/A", // prevents Firestore error
      date: new Date().toISOString(),
    });
    
    console.log("✅ Certificate metadata saved in Firebase, ID:", docId);

    // 5️⃣ Respond success
    res.status(200).json({
      message: "Certificate issued successfully",
      ipfsHash,
      txHash,
      certId,
      docId,
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
}

// GET /verify/:certId
export async function verify(req, res) {
  try {
    const { certId } = req.params;

    // 1️⃣ Fetch certificate metadata from Firebase
    const certificate = await getCertificate(certId);
    if (!certificate)
      return res.status(404).json({ error: "Certificate not found" });

    // 2️⃣ Verify on blockchain using on-chain certId
    let blockchainData;
    try {
      blockchainData = await verifyCertificate(certificate.certId);
    } catch (err) {
      console.error("Blockchain verification failed:", err.message);
      blockchainData = { isValidOnChain: false };
    }

    // 3️⃣ Return merged result
    res.status(200).json({
      ...certificate,
      ...blockchainData,
    });
  } catch (err) {
    console.error("Failed to fetch certificate:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
// GET all certificates
export async function getAll(req, res) {
  try {
    console.log("✅ getAll() called — fetching from Firebase...");
    const certificates = await getAllCertificates();
    console.log(`📄 Retrieved ${certificates.length} certificates from Firebase`);
    res.status(200).json(certificates);
  } catch (err) {
    console.error("❌ Failed to fetch certificates:", err.message);
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
}



export async function getOne(req, res) {
  try {
    const cert = await getCertificate(req.params.id);
    if (!cert) return res.status(404).json({ error: "Certificate not found" });
    res.status(200).json(cert);
  } catch (err) {
    console.error("Error fetching certificate:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}