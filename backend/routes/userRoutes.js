const express = require("express");
const router = express.Router();

const User = require("../models/User");
const auth = require("../middleware/auth");

// ======================
// GET ALL USERS
// ======================
router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// GET CURRENT USER
// ======================
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// UPDATE CURRENT USER
// ======================
router.put("/me", auth, async (req, res) => {
  try {
    const { name, username, email } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = name.trim();
    if (username !== undefined) updateData.username = username.trim();
    if (email !== undefined) updateData.email = email.trim().toLowerCase();

    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// DELETE CURRENT USER ACCOUNT
// ======================
router.delete("/me", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;