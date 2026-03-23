import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// GET all tasks with optional filters
router.get("/", async (req, res) => {
  try {
    const { status, category, clientId } = req.query;

    const where = {};
    if (status) where.status = status;
    if (category) where.category = category;
    if (clientId) where.clientId = parseInt(clientId);

    const tasks = await prisma.task.findMany({
      where,
      include: {
        client: true,
      },
    });

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// CREATE a new task
router.post("/", async (req, res) => {
  try {
    const { title, description, category, dueDate, priority, clientId } =
      req.body;

    // Validation
    if (!title || !category || !dueDate || !clientId) {
      return res.status(400).json({
        error: "Missing required fields: title, category, dueDate, clientId",
      });
    }

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: parseInt(clientId) },
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found" });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        category,
        dueDate: new Date(dueDate),
        priority: priority || "Medium",
        clientId: parseInt(clientId),
      },
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// UPDATE task status
router.patch("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status, priority } = req.body;

    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    // Verify task exists
    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (priority) updateData.priority = priority;

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(taskId) },
      data: updateData,
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

// DELETE a task
router.delete("/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    if (!taskId || isNaN(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    const task = await prisma.task.findUnique({
      where: { id: parseInt(taskId) },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await prisma.task.delete({
      where: { id: parseInt(taskId) },
    });

    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete task" });
  }
});

export default router;
