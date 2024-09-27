const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "https://healthfizz-backend.onrender.com",
  })
);
app.use(bodyParser.json());

// Import routes
const authRoutes = require("./routes/auth");
const healthRoutes = require("./routes/health");
const riskRoutes = require("./routes/risk");
const diseaseRoutes = require("./routes/riskCheck");

// Use routes
app.use("/auth", authRoutes);
app.use("/prevention", healthRoutes);
app.use("/predict", riskRoutes);
app.use("/disease", diseaseRoutes);
app.get("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
