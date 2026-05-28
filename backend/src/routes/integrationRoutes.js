import express from "express";
import * as fraud from "../controllers/fraudController.js";
import * as qr from "../controllers/qrController.js";
import * as face from "../controllers/faceController.js";

const router = express.Router();

/*
 routes:
 POST /api/integrations/fraud/check
 POST /api/integrations/qr/generate
 POST /api/integrations/qr/verify
 POST /api/integrations/face/match
*/

router.post("/fraud/check", fraud.checkFraud);
router.post("/qr/generate", qr.generate);
router.post("/qr/verify", qr.verify);
router.post("/face/match", face.match);

export default router;
