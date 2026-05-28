import express from "express";
import certificateRoutes from "./certificateRoutes.js";

const router = express.Router();
router.use("/certificates", certificateRoutes);

export default router;
