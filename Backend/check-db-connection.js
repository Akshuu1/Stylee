const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Import models
const User = require('./src/models/User');

async function main() {
    console.log('Testing Database Connection...');
    console.log('MONGODB_URI:', process.env.MONGODB_URI || process.env.DATABASE_URL ? 'Loaded' : 'NOT LOADED');

    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log('✅ Database connection successful!');
        console.log(`📦 Connected to: ${mongoose.connection.name}`);

        const userCount = await User.countDocuments();
        console.log(`📊 Current user count: ${userCount}`);

    } catch (error) {
        console.error('❌ Database connection failed:', error);
    } finally {
        await mongoose.connection.close();
    }
}

main();
