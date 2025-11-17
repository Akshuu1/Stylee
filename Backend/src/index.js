const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(
  cors({
    origin: 
      "https://stylee-seven.vercel.app"
    ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;
const JWT_SECRET = process.env.JWT_SECRET;

// ==================== SIGNUP ====================
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ==================== LOGIN ====================
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({
      message: "Login successful!",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/profile", async (req, res) => {
  try {
    const auth = req.headers.authorization;

    if (!auth)
      return res.status(401).json({ message: "No authorization header" });

    const token = auth.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
