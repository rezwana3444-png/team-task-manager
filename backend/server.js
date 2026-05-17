require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

console.log("SERVER STARTED");

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());

// ======================
// BASIC TEST ROUTES
// ======================
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

app.get("/test", (req, res) => {
  res.send("TEST WORKING");
});

// ======================
// IMPORT ROUTES
// ======================
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

console.log("ROUTES LOADED");

// ======================
// API ROUTES
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ======================
// DATABASE CONNECTION
// ======================
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port", PORT);
});
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });