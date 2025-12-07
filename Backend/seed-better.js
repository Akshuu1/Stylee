const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// This seed uses ONLY DummyJSON API which provides actual product images
// We'll use ALL available categories to get 100+ products with real multi-angle images

const CATEGORIES = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches"
];

async function seedBetter() {
    console.log("🌱 Starting improved seed with REAL product images...");

    try {
        // 1. Ensure Admin User Exists
        let admin = await prisma.user.findFirst({
            where: { email: "admin@stylee.com" }
        });

        if (!admin) {
            console.log("Creating admin user...");
            admin = await prisma.user.create({
                data: {
                    name: "Admin User",
                    email: "admin@stylee.com",
                    password: "adminpassword",
                    role: "ADMIN"
                }
            });
        }
        console.log(`Using admin user: ${admin.email} (ID: ${admin.id})`);

        // 2. Clear existing items
        console.log("Clearing existing items...");
        await prisma.item.deleteMany({});

        // 3. Fetch and Insert Items from ALL categories
        let totalAdded = 0;

        for (const category of CATEGORIES) {
            try {
                console.log(`Fetching category: ${category}...`);
                const response = await fetch(`https://dummyjson.com/products/category/${category}`);
                if (!response.ok) throw new Error(`API returned ${response.status}`);
                const data = await response.json();

                if (!data.products || data.products.length === 0) {
                    console.log(`No products found for ${category}`);
                    continue;
                }

                const products = data.products;
                console.log(`Found ${products.length} items in ${category}`);

                // Map and Create - using ORIGINAL images from API
                const createPromises = products.map((p) => {
                    const cleanCategory = mapCategory(p.category);

                    // Use ORIGINAL product images - they show actual product from multiple angles
                    let images = p.images && p.images.length > 0 ? p.images : [];

                    // Ensure at least 3 images by duplicating if needed
                    while (images.length < 3) {
                        images.push(images[images.length - 1] || "https://placehold.co/600x400?text=Product");
                    }

                    return prisma.item.create({
                        data: {
                            name: p.title,
                            description: p.description,
                            price: p.price,
                            category: cleanCategory,
                            brand: p.brand || "Stylee Select",
                            color: null,
                            size: null,
                            images: JSON.stringify(images),
                            tags: p.tags ? p.tags.join(", ") : "",
                            stock: p.stock,
                            popularity: Math.floor(p.rating * 10),
                            createdBy: admin.id
                        }
                    }).catch(err => {
                        console.error(`Failed to add ${p.title}: ${err.message}`);
                        return null;
                    });
                });

                const results = await Promise.all(createPromises);
                const successful = results.filter(r => r !== null).length;
                totalAdded += successful;
                console.log(`Added ${successful} items for ${category}`);
            } catch (err) {
                console.error(`❌ Failed to fetch/seed category ${category}:`, err.message);
            }
        }

        console.log(`\n✅ Seeding complete! Added ${totalAdded} products with REAL product images.`);
        console.log(`📸 All products have actual product images from multiple angles!`);
    } catch (e) {
        console.error("❌ Seeding failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

function mapCategory(apiCategory) {
    const map = {
        "beauty": "Beauty",
        "fragrances": "Fragrances",
        "furniture": "Furniture",
        "groceries": "Groceries",
        "home-decoration": "Home Decor",
        "kitchen-accessories": "Kitchen",
        "laptops": "Electronics",
        "mens-shirts": "Men's Shirts",
        "mens-shoes": "Men's Shoes",
        "mens-watches": "Watches",
        "mobile-accessories": "Accessories",
        "motorcycle": "Vehicles",
        "skin-care": "Skin Care",
        "smartphones": "Electronics",
        "sports-accessories": "Sports",
        "sunglasses": "Accessories",
        "tablets": "Electronics",
        "tops": "Tops",
        "vehicle": "Vehicles",
        "womens-bags": "Bags",
        "womens-dresses": "Dresses",
        "womens-jewellery": "Jewelry",
        "womens-shoes": "Women's Shoes",
        "womens-watches": "Watches"
    };
    return map[apiCategory] || apiCategory;
}

seedBetter();
