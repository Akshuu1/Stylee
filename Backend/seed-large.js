const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Use native fetch (Node 18+)
// Categories to fetch from DummyJSON (Removed clothing categories to replace with modern custom items)
const CATEGORIES = [
    // "womens-dresses",  <-- Replaced with custom Modern Dresses
    // "tops",            <-- Replaced with custom Modern Tops
    // "mens-shirts",     <-- Replaced with custom Modern Shirts
    "womens-shoes",
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

        // Image Pools for Categories (To ensure valid images)
        const IMAGE_POOLS = {
            "womens-shoes": [
                "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1560343076-ec3408845037?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80"
            ],
            "mens-shoes": [
                "https://images.unsplash.com/photo-1527960471264-932f39eb5846?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1618898909019-015031b9c43f?auto=format&fit=crop&w=800&q=80"
            ],
            "mens-watches": [
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1622434641406-a158105c9168?auto=format&fit=crop&w=800&q=80"
            ],
            "womens-watches": [
                "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1596568297728-6a56c4d7eeda?auto=format&fit=crop&w=800&q=80"
            ],
            "womens-bags": [
                "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=800&q=80"
            ],
            "sunglasses": [
                "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1572635196237-14b3f281e960?auto=format&fit=crop&w=800&q=80"
            ],
            "womens-jewellery": [
                "https://images.unsplash.com/photo-1515562141207-7a88fb05220c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1602751584552-8ba42d523f87?auto=format&fit=crop&w=800&q=80"
            ],
            "beauty": [
                "https://images.unsplash.com/photo-1596462502278-27bfdd403348?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80"
            ],
            "fragrances": [
                "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1523293188086-487339338962?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1594165682806-69273c524029?auto=format&fit=crop&w=800&q=80"
            ],
            "skin-care": [
                "https://images.unsplash.com/photo-1556228720-191739c381f2?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1608248597279-f99d160bfbc8?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80"
            ],
            "home-decoration": [
                "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
            ]
        };

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

                // Map and Create
                const createPromises = products.map((p, index) => {
                    const cleanCategory = mapCategory(p.category);

                    // Get varied images from pool (rotate through them)
                    const pool = IMAGE_POOLS[category] || [];
                    const mainImage = pool.length > 0 ? pool[index % pool.length] : "https://placehold.co/600x400?text=Product";
                    // Create array of 3 duplicate/varied images for "angles" effect (in a real app, we'd have 3 different ones)
                    // For now, let's use the main image and maybe rotate others from the pool if available
                    const images = [
                        mainImage,
                        pool.length > 1 ? pool[(index + 1) % pool.length] : mainImage,
                        pool.length > 2 ? pool[(index + 2) % pool.length] : mainImage
                    ];

                    return prisma.item.create({
                        data: {
                            name: p.title,
                            description: p.description,
                            price: p.price,
                            category: cleanCategory,
                            brand: p.brand || "Stylee Select",
                            color: null,
                            size: null,
                            images: JSON.stringify(images), // Override with Unsplash images
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
                // Continue to next category/step instead of crashing
            }
        }

        // 4. Add Curated "Modern & Stylish" Collection (Replacing old clothing)
        console.log("Adding curated Modern Collection...");
        const modernCollection = [
            // --- Men's Blazers & Suits ---
            {
                name: "Italian Wool Slim Fit Blazer",
                description: "Premium Italian wool blazer in charcoal grey. Tailored for a modern slim fit architecture.",
                price: 299.99,
                category: "Men's Blazer",
                brand: "Armani Exchange",
                images: [
                    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1559551409-dadc959f76b8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "blazer, suit, formal, modern"
            },
            {
                name: "Midnight Blue Tuxedo Jacket",
                description: "Velvet lapel midnight blue tuxedo jacket. The ultimate statement piece for evening wear.",
                price: 450.00,
                category: "Men's Blazer",
                brand: "Hugo Boss",
                images: [
                    "https://images.unsplash.com/photo-1594938298603-c8148c47e356?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1550246140-51199477eb52?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "tuxedo, luxury, evening, formal"
            },

            // --- Men's Shirts (Modern) ---
            {
                name: "Oversized Graphic Street Shirt",
                description: "Heavyweight cotton tee with abstract back print. Essential streetwear aesthetic.",
                price: 45.00,
                category: "Men's Shirt",
                brand: "Off-White",
                images: [
                    "https://images.unsplash.com/photo-1523396870777-191237e17271?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "streetwear, oversized, graphic, tee"
            },
            {
                name: "Silk Blend Cuban Collar Shirt",
                description: "Relaxed fit Cuban collar shirt in sage green. Perfect for summer layering.",
                price: 85.00,
                category: "Men's Shirt",
                brand: "Zara Man",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "summer, silk, casual, modern"
            },
            {
                name: "Noir Minimalist Button Up",
                description: "Crisp black button-up with concealed placket. A staple for the minimalist wardrobe.",
                price: 60.00,
                category: "Men's Shirt",
                brand: "COS",
                images: [
                    "https://images.unsplash.com/photo-1620012253295-c15cc3fe631e?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1620012253295-c15cc3fe631e?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "minimalist, black, formal, office"
            },

            // --- Streetwear & Jackets ---
            {
                name: "Cyberpunk Techwear Bomber",
                description: "Water-resistant techwear bomber jacket with multiple utility pockets and straps.",
                price: 180.00,
                category: "Jackets",
                brand: "Nike ACG",
                images: [
                    "https://images.unsplash.com/photo-1551028919-ac7efe5fab2c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1551028919-ac7efe5fab2c?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "techwear, cyberpunk, utility, jacket"
            },
            {
                name: "Vintage Wash Denim Jacket",
                description: "Oversized trucker jacket in vintage light wash. Distressed details for a lived-in look.",
                price: 120.00,
                category: "Jackets",
                brand: "Levi's Premium",
                images: [
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "denim, vintage, casual, jacket"
            },
            {
                name: "Street Style Puffer Vest",
                description: "High-gloss cropped puffer vest. Layer it up for a bold street style statement.",
                price: 95.00,
                category: "Jackets",
                brand: "North Face",
                images: [
                    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "streetwear, puffer, winter, vest"
            },

            // --- Women's Modern Fashion ---
            {
                name: "Avant-Garde Architectural Dress",
                description: "Structured maxi dress with asymmetrical hem and cutout details. Runway ready.",
                price: 1299.99,
                category: "Dresses",
                brand: "Manish Malhotra",
                images: [
                    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "runway, luxury, formal, designer"
            },
            {
                name: "Satin Slip Dress with Bows",
                description: "Coquette aesthetic pink satin slip dress with delicate lace trim.",
                price: 145.00,
                category: "Dresses",
                brand: "Reformation",
                images: [
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1623838029088-72ee9e414bd6?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "coquette, vintage, cute, summer"
            },
            {
                name: "Emerald Green Evening Gown",
                description: "Floor-length sequined gown in deep emerald. Perfect for galas and red carpet events.",
                price: 550.00,
                category: "Dresses",
                brand: "Elie Saab",
                images: [
                    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1572804013427-4d7ca726b711?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "evening, gown, luxury, party"
            },
            {
                name: "Oversized Boyfriend Blazer",
                description: "Boxy fit blazer in beige. The ultimate chic office-to-dinner piece.",
                price: 180.00,
                category: "Women's Blazer",
                brand: "The Frankie Shop",
                images: [
                    "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "chic, minimalist, office, blazer"
            },
            {
                name: "High-Waist Wide Leg Trousers",
                description: "Flowy pleated trousers in cream. Elegant and comfortable.",
                price: 110.00,
                category: "Trousers",
                brand: "Uniqlo U",
                images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "minimalist, trousers, workwear, chic"
            }
        ];

        for (const item of modernCollection) {
            await prisma.item.create({
                data: {
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    category: item.category,
                    brand: item.brand,
                    color: null,
                    size: null,
                    images: JSON.stringify(item.images),
                    tags: item.tags,
                    stock: 20,
                    popularity: 100,
                    createdBy: admin.id
                }
            }).catch(err => console.error(`Failed to add ${item.name}:`, err));
        }
        console.log(`Added ${modernCollection.length} curated Modern items`);

        console.log(`\n✅ Seeding complete! Added ${totalAdded + modernCollection.length} total products.`);
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
