const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// Import routes
const authRoutes = require("./routes/auth");
const itemRoutes = require("./routes/items");
const userRoutes = require("./routes/users");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://stylee-gamma.vercel.app"
    ],
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
  await prisma.$disconnect();
  process.exit(0);
});

app.listen(PORT, () => {
  console.log(`🚀 Stylee Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}`);
});

