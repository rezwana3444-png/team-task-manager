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
  origin: "*", // Allow all origins for now to eliminate CORS as the issue
  methods:["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders:["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"],
  credentials: false // Note: credentials must be false if origin is "*"
}));
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

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