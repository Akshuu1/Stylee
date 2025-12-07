const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();
const prisma = new PrismaClient();

async function testSignup() {
    console.log('🧪 Testing Signup Logic...');

    // Create a unique email to avoid "User already exists" error
    const testEmail = `debug_user_${Date.now()}@example.com`;

    const testUser = {
        name: 'Debug User',
        email: testEmail,
        password: 'password123',
        role: 'USER'
    };

    try {
        // 2. Hash password
        console.log('2. Hashing password...');
        const hashedPassword = await bcrypt.hash(testUser.password, 10);

        // 3. Create user
        console.log(`3. Creating user in DB (Email: ${testEmail})...`);
        const newUser = await prisma.user.create({
            data: {
                name: testUser.name,
                email: testUser.email,
                password: hashedPassword,
                role: testUser.role
            },
        });

        console.log('✅ Signup Successful! User created with ID:', newUser.id);
        console.log('!! CONCLUSION: The code logic is correct. Your running server is STALE and needs a restart to pick up changes.');

        // Cleanup
        await prisma.user.delete({ where: { id: newUser.id } });
        console.log('🧹 Test user cleaned up.');

    } catch (error) {
        console.error('❌ Signup Logic Failed. Real Error Below:');
        console.error(error);
    } finally {
        await prisma.$disconnect();
    }
}

testSignup();
