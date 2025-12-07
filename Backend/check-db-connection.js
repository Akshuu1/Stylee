const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    console.log('Testing Database Connection...');
    console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Loaded (starts with ' + process.env.DATABASE_URL.substring(0, 10) + '...)' : 'NOT LOADED');

    try {
        await prisma.$connect();
        console.log('✅ Database connection successful!');

        const userCount = await prisma.user.count();
        console.log(`📊 Current user count: ${userCount}`);

    } catch (error) {
        console.error('❌ Database connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
