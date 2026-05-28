import express from "express";

const router = express.Router();

// Sample GET route
router.get("/", (req, res) => {
  res.send("Hello from Example Route! 🚀");
});

export default router;
