import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// ✅ Initialize Firebase once
if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    console.log("✅ Firebase initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Firebase:", error.message);
  }
}

export const db = admin.firestore();

// -----------------------------------------
// 🔹 Save certificate metadata
// -----------------------------------------
export async function saveCertificate(data) {
  const docRef = await db.collection("certificates").add(data);
  console.log(`✅ Certificate metadata saved in Firebase, ID: ${docRef.id}`);
  return docRef.id;
}

// -----------------------------------------
// 🔹 Fetch certificate by ID
// -----------------------------------------
export async function getCertificate(id) {
  const doc = await db.collection("certificates").doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

// -----------------------------------------
// 🔹 Fetch all certificates
// -----------------------------------------
export async function getAllCertificates() {
  try {
    const snapshot = await db.collection("certificates").get();
    const certificates = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log(`📄 Retrieved ${certificates.length} certificates from Firebase`);
    return certificates;
  } catch (error) {
    console.error("❌ Failed to fetch certificates:", error.message);
    throw error;
  }
  
}
