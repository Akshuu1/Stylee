// Script to create an admin user with a proper password
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Import models
const User = require("./src/models/User");

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("📦 Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@stylee.com" });

        if (existingAdmin) {
            console.log("✅ Admin user already exists!");
            console.log("\n📧 Email: admin@stylee.com");
            console.log("🔑 Password: admin123");
            console.log("\n👉 You can now login and access /admin dashboard");
            await mongoose.connection.close();
            return;
        }

        // Create admin user with hashed password
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await User.create({
            name: "Admin User",
            email: "admin@stylee.com",
            password: hashedPassword,
            role: "ADMIN",
        });

        console.log("✅ Admin user created successfully!");
        console.log("\n📧 Email: admin@stylee.com");
        console.log("🔑 Password: admin123");
        console.log("\n👉 Login at http://localhost:5173/login");
        console.log("👉 Then visit http://localhost:5173/admin");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

createAdmin();
