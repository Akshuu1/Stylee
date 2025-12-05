// Script to update existing admin user with proper password
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function updateAdmin() {
    try {
        // Hash the password properly
        const hashedPassword = await bcrypt.hash("admin123", 10);

        // Update the admin user
        const admin = await prisma.user.update({
            where: { email: "admin@stylee.com" },
            data: {
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("✅ Admin user updated successfully!");
        console.log("\n📧 Email: admin@stylee.com");
        console.log("🔑 Password: admin123");
        console.log("\n🎯 Steps to access admin dashboard:");
        console.log("1. Go to http://localhost:5173/login");
        console.log("2. Login with the credentials above");
        console.log("3. Visit http://localhost:5173/admin");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

updateAdmin();
