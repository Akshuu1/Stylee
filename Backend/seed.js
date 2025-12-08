// Quick script to add sample products to the database
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const User = require("./src/models/User");
const Item = require("./src/models/Item");

async function addSampleProducts() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE_URL);
        console.log("📦 Connected to MongoDB");

        // Create a sample user first
        const user = await User.create({
            name: "Admin User",
            email: "admin@stylee.com",
            password: "$2a$10$samplehashedpassword", // This is just a placeholder
            role: "ADMIN",
        });

        console.log("✅ Created admin user:", user.email);

        // Create sample products
        const products = [
            {
                name: "Classic White T-Shirt",
                description: "Premium cotton t-shirt with a comfortable fit. Perfect for everyday wear.",
                price: 29.99,
                category: "Clothing",
                brand: "StyleBrand",
                color: "White",
                size: "M",
                images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500"],
                tags: ["casual", "cotton", "summer"],
                stock: 50,
                popularity: 100,
                createdBy: user._id,
            },
            {
                name: "Denim Jacket",
                description: "Classic denim jacket with a modern fit. A wardrobe essential.",
                price: 89.99,
                category: "Outerwear",
                brand: "DenimCo",
                color: "Blue",
                size: "L",
                images: ["https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500"],
                tags: ["denim", "jacket", "casual"],
                stock: 30,
                popularity: 85,
                createdBy: user._id,
            },
            {
                name: "Black Sneakers",
                description: "Comfortable and stylish sneakers for all-day wear.",
                price: 79.99,
                category: "Footwear",
                brand: "SneakerPro",
                color: "Black",
                size: "10",
                images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"],
                tags: ["sneakers", "shoes", "casual"],
                stock: 40,
                popularity: 120,
                createdBy: user._id,
            },
            {
                name: "Summer Dress",
                description: "Light and breezy summer dress perfect for warm weather.",
                price: 59.99,
                category: "Clothing",
                brand: "SummerStyle",
                color: "Floral",
                size: "S",
                images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500"],
                tags: ["dress", "summer", "floral"],
                stock: 25,
                popularity: 95,
                createdBy: user._id,
            },
        ];

        for (const product of products) {
            const item = await Item.create(product);
            console.log(`✅ Created product: ${item.name}`);
        }

        console.log("\n🎉 Successfully added sample products!");
        console.log("You can now view them at http://localhost:5173/products");
    } catch (error) {
        console.error("❌ Error:", error);
    } finally {
        await mongoose.connection.close();
    }
}

addSampleProducts();
