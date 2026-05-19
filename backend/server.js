require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// ======================
// MIDDLEWARE
// ======================
// REPLACE your current app.use(cors({ ... })) with this:
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://team-task-manager-r1rya2gyu-rezwana-s-projects.vercel.app",
    "https://team-task-manager-production-707c.up.railway.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false
}));
app.use(express.json());

// ======================
// TEST ROUTES
// ======================
app.get("/", (req, res) => {
  res.send("Backend is working 🚀");
});

// ======================
// IMPORT ROUTES
// ======================
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// ======================
// API ROUTES (Note the /api prefix)
// ======================
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// ======================
// DATABASE CONNECTION
// ======================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit if DB connection fails
  });