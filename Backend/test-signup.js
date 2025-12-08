const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./src/models/User");

async function testSignup() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("📦 Connected to MongoDB");

        const testUser = {
            name: "Test User",
            email: "test@example.com",
            password: await bcrypt.hash("password123", 10),
            role: "USER"
        };

        const user = await User.create(testUser);
        console.log("✅ Test user created successfully!");
        console.log("User:", { id: user._id, name: user.name, email: user.email, role: user.role });

        // Clean up - delete test user
        await User.findByIdAndDelete(user._id);
        console.log("🧹 Test user cleaned up");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

testSignup();
