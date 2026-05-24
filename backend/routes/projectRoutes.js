const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const auth = require("../middleware/auth");

console.log("PROJECT ROUTES LOADED");

// CREATE PROJECT
router.post("/", async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL PROJECTS
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find();

    res.json(projects);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;