// server/index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const tipsRouter = require("./routes/tips");

const app = express();
const PORT = 4500;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017/whatnotdb";

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/tips", tipsRouter);

// MongoDB connection with retry
async function connectWithRetry() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");
    app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));

  } catch (err) {
    console.error("MongoDB connection failed ❌ Retrying in 5s...", err.message);
    setTimeout(connectWithRetry, 5000); // retry after 5 seconds
  }
}

connectWithRetry();
