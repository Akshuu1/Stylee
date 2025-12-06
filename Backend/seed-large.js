const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Use native fetch (Node 18+)
// Categories to fetch from DummyJSON
const CATEGORIES = [
    "womens-dresses",
    "tops",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "sunglasses"
];

async function seedLarge() {
    console.log("🌱 Starting large scale seed...");

    try {
        // 1. Ensure Admin User Exists
        let admin = await prisma.user.findFirst({
            where: { email: "admin@stylee.com" }
        });

        if (!admin) {
            console.log("Creating admin user...");
            // Note: In a real app, hash the password. For seed/demo, plain text or simple hash if model requires it.
            // Assuming model behaves like previous seed.js
            admin = await prisma.user.create({
                data: {
                    name: "Admin User",
                    email: "admin@stylee.com",
                    password: "adminpassword", // In production, use bcrypt
                    role: "ADMIN"
                }
            });
        }
        console.log(`Using admin user: ${admin.email} (ID: ${admin.id})`);

        // 2. Clear existing items (Optional - user might want to keep them, but cleaner for "demo" state)
        // console.log("Clearing existing items...");
        // await prisma.item.deleteMany({});  // Uncomment if you want to wipe DB first

        // 3. Fetch and Insert Items
        let totalAdded = 0;

        for (const category of CATEGORIES) {
            console.log(`Fetching category: ${category}...`);
            const response = await fetch(`https://dummyjson.com/products/category/${category}`);
            const data = await response.json();

            if (!data.products || data.products.length === 0) {
                console.log(`No products found for ${category}`);
                continue;
            }

            const products = data.products;
            console.log(`Found ${products.length} items in ${category}`);

            // Map and Create
            // We use loop instead of createMany to handle potential unique constraint or relation quirks individually if needed, 
            // though createMany is faster. createMany doesn't return created records in all DBs (like SQLite sometimes).
            // For ~100 items, parallel promises are fine.

            const createPromises = products.map(p => {
                return prisma.item.create({
                    data: {
                        name: p.title,
                        description: p.description,
                        price: p.price,
                        category: mapCategory(p.category), // Simplify category name if needed
                        brand: p.brand || "Stylee Select",
                        color: null, // API doesn't provide color
                        size: null,  // API doesn't provide size
                        images: JSON.stringify(p.images), // Store as JSON string
                        tags: p.tags ? p.tags.join(", ") : "",
                        stock: p.stock,
                        popularity: Math.floor(p.rating * 10), // Use rating as popularity
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
        }

        console.log(`\n✅ Seeding complete! Added ${totalAdded} total products.`);

    } catch (e) {
        console.error("❌ Seeding failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

// Helper to map DummyJSON categories to cleaner UI categories if needed
function mapCategory(apiCategory) {
    // Simple mapping or return as is. The API categories are actually quite good (slugs).
    // We might want to capitalize them for display (although frontend can do that).
    // Let's store them as reliable keys.
    const map = {
        "womens-dresses": "Dresses",
        "tops": "Tops",
        "womens-shoes": "Women's Shoes",
        "mens-shirts": "Men's Shirts",
        "mens-shoes": "Men's Shoes",
        "mens-watches": "Watches",
        "womens-watches": "Watches",
        "womens-bags": "Bags",
        "sunglasses": "Accessories"
    };
    return map[apiCategory] || apiCategory;
}

seedLarge();
