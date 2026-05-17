const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

console.log("TASK ROUTES LOADED");

// ======================
// TEST ROUTE (CHECK IF WORKING)
// ======================
router.get("/test", (req, res) => {
  res.send("TASK ROUTES WORKING");
});

// ======================
// GET ALL TASKS
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo")

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ======================
// CREATE TASK (ADMIN ONLY)
// ======================
router.post("/create", auth, role(["Admin"]), async (req, res) => {
  try {
    const { title, description, assignedTo, project, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      assignedTo,
      project,
      dueDate,
      status: "Pending"
    });

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
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
router.get("/dashboard", auth, role(["Admin"]), async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: "Pending" });
    const done = await Task.countDocuments({ status: "Done" });

    res.json({
      total,
      pending,
      done
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;