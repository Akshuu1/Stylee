// Script to create an admin user with a proper password
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function createAdmin() {
    try {
        // Check if admin already exists
        const existingAdmin = await prisma.user.findUnique({
            where: { email: "admin@stylee.com" },
        });

        if (existingAdmin) {
            console.log("✅ Admin user already exists!");
            console.log("\n📧 Email: admin@stylee.com");
            console.log("🔑 Password: admin123");
            console.log("\n👉 You can now login and access /admin dashboard");
            await prisma.$disconnect();
            return;
        }

        // Create admin user with hashed password
        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await prisma.user.create({
            data: {
                name: "Admin User",
                email: "admin@stylee.com",
                password: hashedPassword,
                role: "ADMIN",
            },
        });

        console.log("✅ Admin user created successfully!");
        console.log("\n📧 Email: admin@stylee.com");
        console.log("🔑 Password: admin123");
        console.log("\n👉 Login at http://localhost:5173/login");
        console.log("👉 Then visit http://localhost:5173/admin");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
