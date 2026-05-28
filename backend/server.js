import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import routes from "./src/routes/index.js"; 
import integrationRoutes from "./src/routes/integrationRoutes.js"; // <-- ADD THIS

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// existing routes
app.use("/api", routes);

// mount integration routes
app.use("/api/integrations", integrationRoutes); // <-- ADD THIS

app.get("/", (req, res) => res.send("CertiTrust Backend Running 🚀"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
