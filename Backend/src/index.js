const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
// Load env vars variables BEFORE importing routes/controllers
dotenv.config();

const { connectDB, closeDB } = require("./config/database");

// Import routes
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow localhost and local network IPs (for development/testing on different devices)
      if (
        origin.startsWith("http://localhost") ||
        origin.startsWith("http://127.0.0.1") ||
        origin.match(/^http:\/\/192\.168\.\d{1,3}\.\d{1,3}/) ||
        origin.match(/^http:\/\/10\.\d{1,3}\.\d{1,3}\.\d{1,3}/) ||
        origin === "https://stylee-gamma.vercel.app"
      ) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/users", userRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Stylee Backend API is running successfully!",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      items: "/api/items",
      users: "/api/users"
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// Graceful shutdown
process.on("SIGINT", async () => {
  await closeDB();
  process.exit(0);
});

// Initialize MongoDB connection and start server
const startServer = async () => {
  await connectDB();

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Stylee Backend running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📱 Network: http://10.7.2.90:${PORT}`);
    console.log(`   Use the Network URL to access from your phone!`);
  });
};

startServer();
