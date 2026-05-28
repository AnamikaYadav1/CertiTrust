// src/services/faceService.js
import axios from "axios";

export async function verifyFace(imgBase64A, imgBase64B) {
  const FACE_URL =
    process.env.FACE_VERIF_URL || "http://localhost:6001/face/verify";

  const res = await axios.post(
    FACE_URL,
    { img1: imgBase64A, img2: imgBase64B },
    { timeout: 15000 }
  );

  return res.data;
}
