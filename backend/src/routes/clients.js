import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await prisma.client.findMany({
      include: {
        tasks: true,
      },
    });
    res.json(clients);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// GET tasks for a specific client
router.get("/:clientId/tasks", async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId || isNaN(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const tasks = await prisma.task.findMany({
      where: {
        clientId: parseInt(clientId),
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// GET single client
router.get("/:clientId", async (req, res) => {
  try {
    const { clientId } = req.params;

    if (!clientId || isNaN(clientId)) {
      return res.status(400).json({ error: "Invalid client ID" });
    }

    const client = await prisma.client.findUnique({
      where: {
        id: parseInt(clientId),
      },
      include: {
        tasks: true,
      },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch client" });
  }
});

export default router;
