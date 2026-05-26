const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

console.log("TASK ROUTES LOADED");

// ======================
// TEST ROUTE
// ======================
router.get("/test", (req, res) => {
  res.send("TASK ROUTES WORKING");
});

// ======================
// GET ALL TASKS
// ======================
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// CREATE TASK (SIMPLIFIED)
// ======================
router.post("/create",auth , async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        error: "Task title is required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      status: "todo",
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.log("TASK CREATE ERROR:", err);

    res.status(500).json({
      error: err.message,
    });
  }
});

// ======================
// UPDATE TASK STATUS
// ======================
router.put("/status/:id", auth, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// DASHBOARD STATS
// ======================
router.get("/dashboard", auth, role(["admin"]), async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: "todo" });
    const done = await Task.countDocuments({ status: "done" });

    res.json({
      total,
      pending,
      done,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;