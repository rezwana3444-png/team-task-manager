const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// CREATE PROJECT (PROTECTED)
router.post("/", auth, async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id   // AUTO from token
    });

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;