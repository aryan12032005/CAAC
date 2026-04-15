import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import cors from "cors";
import express from "express";

import connectDB from "./db.js";
import adminRoutes from "./routes/adminRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import sectionRoutes from "./routes/sectionRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

// Serve static uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/admin", adminRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/sections", sectionRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
