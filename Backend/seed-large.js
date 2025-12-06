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
    "sunglasses",
    "womens-jewellery",
    "beauty",
    "fragrances",
    "skin-care",
    "home-decoration"
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

        // 2. Clear existing items to remove broken image links
        console.log("Clearing existing items...");
        await prisma.item.deleteMany({});

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
            const createPromises = products.map((p, index) => {
                const cleanCategory = mapCategory(p.category);

                // Use ORIGINAL DummyJSON images as requested by user.
                return prisma.item.create({
                    data: {
                        name: p.title,
                        description: p.description,
                        price: p.price,
                        category: cleanCategory,
                        brand: p.brand || "Stylee Select",
                        color: null,
                        size: null,
                        images: JSON.stringify(p.images),
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
        }
        console.log(`\n✅ Seeding complete! Added ${totalAdded} total products.`);
    } catch (e) {
        console.error("❌ Seeding failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

function mapCategory(apiCategory) {
    const map = {
        "womens-dresses": "Dresses",
        "tops": "Tops",
        "womens-shoes": "Women's Shoes",
        "mens-shirts": "Men's Shirts",
        "mens-shoes": "Men's Shoes",
        "mens-watches": "Watches",
        "womens-watches": "Watches",
        "womens-bags": "Bags",
        "sunglasses": "Accessories",
        "womens-jewellery": "Jewelry",
        "beauty": "Beauty",
        "fragrances": "Fragrances",
        "skin-care": "Skin Care",
        "home-decoration": "Home Decor"
    };
    return map[apiCategory] || apiCategory;
}

seedLarge();
