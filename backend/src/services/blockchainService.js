import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// ✅ Import ABI dynamically (Node 22 safe)
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const abiPath = path.join(__dirname, "../utils/CertiTrustABI.json");
const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));


// ✅ Environment variables
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

// ✅ Initialize provider, wallet, and contract
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, wallet);

console.log("✅ Blockchain connected successfully");

// ------------------------------------------
// 🔹 Add issuer to whitelist (only owner)
// ------------------------------------------
export async function whitelistIssuer(address) {
  try {
    console.log(`Whitelisting backend wallet: ${address}`);
    const tx = await contract.addIssuer(address);
    await tx.wait();
    console.log(`✅ Backend wallet whitelisted successfully: ${address}`);
    return true;
  } catch (err) {
    console.warn(`Skipping whitelist if already done: ${err.reason || err.message}`);
    return false;
  }
}

// ------------------------------------------
// 🔹 Issue certificate
// ------------------------------------------
export async function issueCertificate(studentAddr, ipfsHash) {
  try {
    // Whitelist backend issuer (optional safeguard)
    await whitelistIssuer(wallet.address);

    console.log("🔹 Starting blockchain transaction...");
    console.log("Contract address:", CONTRACT_ADDRESS);
    console.log("Student:", studentAddr);
    console.log("IPFS:", ipfsHash);

    const tx = await contract.issueCertificate(studentAddr, ipfsHash);
    const receipt = await tx.wait();

    console.log("🔹 Waiting for transaction confirmation...");

    // Extract event details from logs
    const event = receipt.logs
      .map((log) => {
        try {
          return contract.interface.parseLog(log);
        } catch {
          return null;
        }
      })
      .find((e) => e && e.name === "CertificateIssued");

    if (event) {
      console.log(`✅ CertificateIssued event found, Certificate ID: ${event.args.id}`);
      return {
        certId: Number(event.args.id),
        txHash: receipt.transactionHash,
      };
    } else {
      console.warn("⚠️ CertificateIssued event not found in logs");
      return {
        certId: null,
        txHash: receipt.transactionHash,
      };
    }
  } catch (err) {
    console.error("❌ Blockchain error while issuing:", err.message);
    throw new Error("Failed to issue certificate on blockchain");
  }
}
