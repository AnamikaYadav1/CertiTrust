// ✅ blockchainConfig.js — FINAL CLEAN VERSION

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ethers } from "ethers";
import dotenv from "dotenv";

dotenv.config();

// ✅ Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Load ABI manually (fixes JSON import issue)
const abiPath = path.join(__dirname, "../utils/CertiTrustABI.json");
const abi = JSON.parse(readFileSync(abiPath, "utf8"));

// ✅ Initialize provider (Polygon Amoy)
const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// ✅ Handle private key safely
let pk = process.env.PRIVATE_KEY?.trim();
if (!pk) {
  console.error("❌ PRIVATE_KEY missing in .env file");
  process.exit(1);
}
if (!pk.startsWith("0x")) pk = "0x" + pk;

// ✅ Initialize wallet
const wallet = new ethers.Wallet(pk, provider);

// ✅ Initialize contract instance
export const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);
export { wallet };


console.log("✅ Blockchain connected successfully");
console.log("✅ Backend wallet address:", wallet.address);
