import { verifyFace } from "../services/faceService.js";

export const match = async (req, res) => {
  try {
    const { img1, img2 } = req.body; // base64 strings

    if (!img1 || !img2) {
      return res
        .status(400)
        .json({ success: false, error: "img1 and img2 required" });
    }

    const result = await verifyFace(img1, img2);
    res.json({ success: true, result });
  } catch (e) {
    console.error("face.match error:", e);
    res.status(500).json({ success: false, error: e.message });
  }
};
