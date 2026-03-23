import express from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import clientRoutes from "./routes/clients.js";
import taskRoutes from "./routes/tasks.js";
import cors from "cors";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/clients", clientRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/db-health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "Database connected successfully" });
  } catch (error) {
    res.status(500).json({
      status: "Database connection failed",
      error: error.message,
      databaseUrl: process.env.DATABASE_URL ? "Set" : "Not set",
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
