const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors")


// Configure dotenv
dotenv.config();

// Database connect
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("emon");
});

// Define the port from environment variables or use 8000 as default
const PORT = process.env.PORT || 8001;

// Run the app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
