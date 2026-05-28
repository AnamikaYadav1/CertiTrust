import express from "express";
import multer from "multer";
import { issue, getAll, getOne } from "../controllers/certificateController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Issue new certificate
router.post("/issue", upload.single("file"), issue);

// Fetch all certificates
router.get("/", getAll);

// Fetch one certificate by ID
router.get("/:id", getOne);

export default router;
