const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./src/models/User");

async function updateAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("📦 Connected to MongoDB");

        const admin = await User.findOne({ email: "admin@stylee.com" });

        if (!admin) {
            console.log("❌ Admin user not found!");
            await mongoose.connection.close();
            return;
        }

        // Update password
        const hashedPassword = await bcrypt.hash("admin123", 10);
        admin.password = hashedPassword;
        await admin.save();

        console.log("✅ Admin password updated successfully!");
        console.log("\n📧 Email: admin@stylee.com");
        console.log("🔑 Password: admin123");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

updateAdmin();
