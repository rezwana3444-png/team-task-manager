const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/auth");

console.log("PROJECT ROUTES LOADED");

// ======================
// CREATE PROJECT
// ======================
router.post("/", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Project name is required",
      });
    }

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || "",
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// GET ALL PROJECTS
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// EDIT PROJECT
// ======================
router.put("/:id", auth, async (req, res) => {
  try {
    const { name, description } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description.trim();

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// DELETE PROJECT
// ======================
router.delete("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;