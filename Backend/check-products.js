const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Item = require("./src/models/Item");

async function checkProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("📦 Connected to MongoDB");

        const items = await Item.find({}).populate('createdBy', 'name email');
        console.log(`📊 Total products: ${items.length}`);

        items.forEach((item, index) => {
            console.log(`\n${index + 1}. ${item.name}`);
            console.log(`   Price: $${item.price}`);
            console.log(`   Category: ${item.category}`);
            console.log(`   Stock: ${item.stock}`);
        });
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

checkProducts();
