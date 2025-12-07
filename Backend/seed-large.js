const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Use native fetch (Node 18+)
// Categories to fetch from DummyJSON
const CATEGORIES = [
    "womens-dresses",
    "tops",
    "mens-shirts",
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
            "womens-dresses": [
                "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
            ],
            "tops": [
                "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80"
            ],
            "mens-shirts": [
                "https://images.unsplash.com/photo-1620012253295-c15cc3fe631e?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
            ],
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

                    // Use ORIGINAL DummyJSON images (they have multiple views/angles)
                    // Only use Unsplash pool as FALLBACK for categories without images
                    const pool = IMAGE_POOLS[category] || [];
                    const images = p.images && p.images.length > 0
                        ? p.images  // Use original product images from DummyJSON
                        : [  // Fallback to Unsplash pool if no images
                            pool[index % pool.length] || "https://placehold.co/600x400?text=Product",
                            pool[(index + 1) % pool.length] || "https://placehold.co/600x400?text=Product",
                            pool[(index + 2) % pool.length] || "https://placehold.co/600x400?text=Product"
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
                            images: JSON.stringify(images), // Keep original product images
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
            },

            // ========== 50 MORE MODERN AESTHETIC CLOTHING ITEMS ==========

            // --- Minimalist Essentials ---
            {
                name: "Ribbed Cotton Crop Top",
                description: "Seamless ribbed crop top in ivory. Perfect for layering with high-waisted pieces.",
                price: 35.00,
                category: "Tops",
                brand: "Skims",
                images: [
                    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "minimalist, crop, ribbed, basics"
            },
            {
                name: "Cashmere Turtleneck Sweater",
                description: "Luxurious 100% cashmere turtleneck in camel. Essential winter wardrobe staple.",
                price: 220.00,
                category: "Tops",
                brand: "Everlane",
                images: [
                    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "cashmere, luxury, winter, turtleneck"
            },
            {
                name: "Oversized White Oxford Shirt",
                description: "Crisp cotton oxford shirt with dropped shoulders. Effortlessly chic.",
                price: 75.00,
                category: "Tops",
                brand: "Toteme",
                images: [
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1618333261702-8e5c3e00e3f6?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "oxford, oversized, minimalist, white"
            },

            // --- Y2K & Trendy Pieces ---
            {
                name: "Baby Tee with Butterfly Print",
                description: "Fitted baby tee in bubblegum pink with vintage butterfly graphic. Pure Y2K vibes.",
                price: 28.00,
                category: "Tops",
                brand: "Urban Outfitters",
                images: [
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "Y2K, butterfly, baby tee, trendy"
            },
            {
                name: "Low-Rise Cargo Jeans",
                description: "Vintage-inspired low-rise cargo jeans with utility pockets. Early 2000s aesthetic.",
                price: 98.00,
                category: "Trousers",
                brand: "I.AM.GIA",
                images: [
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "Y2K, cargo, low-rise, denim"
            },
            {
                name: "Velour Zip-Up Tracksuit Set",
                description: "Plush velour tracksuit in hot pink. Juicy Couture inspired throwback.",
                price: 125.00,
                category: "Sets",
                brand: "Juicy Couture",
                images: [
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "velour, tracksuit, Y2K, pink"
            },

            // --- Streetwear Edge ---
            {
                name: "Distressed Graphic Band Long Sleeve",
                description: "Oversized long sleeve with vintage band graphics and intentional distressing.",
                price: 55.00,
                category: "Men's Shirt",
                brand: "Represent",
                images: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "streetwear, graphic, distressed, oversized"
            },
            {
                name: "Heavyweight Cargo Parachute Pants",
                description: "Tactical-inspired parachute pants with adjustable straps and multiple pockets.",
                price: 135.00,
                category: "Trousers",
                brand: "Heliot Emil",
                images: [
                    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "cargo, tactical, streetwear, pants"
            },
            {
                name: "Cropped Puffer Jacket",
                description: "Short puffer jacket with glossy finish. Perfect for transitional weather layering.",
                price: 165.00,
                category: "Jackets",
                brand: "The North Face",
                images: [
                    "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "puffer, cropped, streetwear, winter"
            },

            // --- Feminine & Romantic ---
            {
                name: "Floral Midi Slip Dress",
                description: "Delicate floral print slip dress with cowl neckline. Dreamy cottage core aesthetic.",
                price: 155.00,
                category: "Dresses",
                brand: "Réalisation Par",
                images: [
                    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "floral, midi, slip dress, romantic"
            },
            {
                name: "Ruffled Swiss Dot Blouse",
                description: "Sheer swiss dot blouse with romantic ruffled collar. Parisian chic.",
                price: 89.00,
                category: "Tops",
                brand: "Ganni",
                images: [
                    "https://images.unsplash.com/photo-1615886498639-e4a5339620aa?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "ruffles, romantic, blouse, sheer"
            },
            {
                name: " Lace Trim Camisole",
                description: "Silk satin camisole with delicate lace trim. Effortless femininity.",
                price: 68.00,
                category: "Tops",
                brand: "Zimmermann",
                images: [
                    "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "lace, silk, camisole, feminine"
            },

            // --- Business Casual / Elevated ---
            {
                name: "Pinstripe Double-Breasted Vest",
                description: "Tailored pinstripe vest in navy. Modern power dressing essential.",
                price: 145.00,
                category: "Women's Blazer",
                brand: "Reiss",
                images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "pinstripe, vest, business, formal"
            },
            {
                name: "Tailored Wide-Leg Trousers",
                description: "High-waisted wide-leg trousers with crisp pleats. Timeless elegance.",
                price: 125.00,
                category: "Trousers",
                brand: "Massimo Dutti",
                images: [
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "wide-leg, tailored, professional, elegant"
            },
            {
                name: "Silk Button-Down Shirt",
                description: "Luxe silk button-down in champagne. Versatile from office to evening.",
                price: 195.00,
                category: "Tops",
                brand: "Equipment",
                images: [
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "silk, button-down, luxury, versatile"
            },

            // --- Outerwear Statement Pieces ---
            {
                name: "Longline Camel Coat",
                description: "Classic double-breasted camel coat. Investment piece that never goes out of style.",
                price: 395.00,
                category: "Jackets",
                brand: "Max Mara",
                images: [
                    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "camel coat, longline, classic, investment"
            },
            {
                name: "Faux Leather Blazer",
                description: "Edgy vegan leather blazer with structured shoulders. Modern rocker aesthetic.",
                price: 175.00,
                category: "Jackets",
                brand: "Zara",
                images: [
                    "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "faux leather, blazer, edgy, vegan"
            },
            {
                name: "Shearling Aviator Jacket",
                description: "Cozy shearling-lined aviator jacket in cognac brown. Winter essential.",
                price: 425.00,
                category: "Jackets",
                brand: "AllSaints",
                images: [
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "shearling, aviator, winter, cozy"
            },

            // --- Knitwear Collection ---
            {
                name: "Chunky Cable Knit Cardigan",
                description: "Oversized cable knit cardigan in cream. Cozy grandpa core vibes.",
                price: 135.00,
                category: "Tops",
                brand: "& Other Stories",
                images: [
                    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "cable knit, cardigan, oversized, cozy"
            },
            {
                name: "Cropped Knit Polo",
                description: "Fitted ribbed knit polo in sage green. Retro sportswear charm.",
                price: 65.00,
                category: "Tops",
                brand: "Miaou",
                images: [
                    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "polo, cropped, knit, retro"
            },
            {
                name: "Mohair Blend Sweater Vest",
                description: "Fuzzy mohair vest in chocolate brown. Layer over shirts or wear solo.",
                price: 95.00,
                category: "Tops",
                brand: "Acne Studios",
                images: [
                    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "mohair, vest, fuzzy, layering"
            },

            // --- Denim Variations ---
            {
                name: "Barrel Leg Jeans",
                description: "Modern barrel leg silhouette in mid-wash denim. Fashion-forward fit.",
                price: 115.00,
                category: "Trousers",
                brand: "Agolde",
                images: [
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "denim, barrel leg, modern, jeans"
            },
            {
                name: "Dark Wash Straight Leg Jeans",
                description: "Classic straight leg jeans in dark indigo. Timeless wardrobe staple.",
                price: 98.00,
                category: "Trousers",
                brand: "Levi's",
                images: [
                    "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "denim, straight leg, classic, dark wash"
            },
            {
                name: "Vintage Flare Jeans",
                description: "High-rise flare jeans with vintage wash. 70s inspired silhouette.",
                price: 105.00,
                category: "Trousers",
                brand: "Mother Denim",
                images: [
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "flare, vintage, 70s, high-rise"
            },

            // --- Party & Evening Wear ---
            {
                name: "Sequin Mini Dress",
                description: "All-over sequin mini dress in silver. Show-stopping party piece.",
                price: 185.00,
                category: "Dresses",
                brand: "For Love & Lemons",
                images: [
                    "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "sequin, mini dress, party, glam"
            },
            {
                name: "Velvet Wrap Dress",
                description: "Luxurious velvet wrap dress in deep burgundy. Sophisticated evening elegance.",
                price: 165.00,
                category: "Dresses",
                brand: "Reformation",
                images: [
                    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1572804013427-4d7ca726b711?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "velvet, wrap dress, evening, luxe"
            },
            {
                name: "Cut-Out Bodycon Dress",
                description: "Sleek bodycon dress with strategic cutouts. Confident and sexy.",
                price: 95.00,
                category: "Dresses",
                brand: "House of CB",
                images: [
                    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1623838029088-72ee9e414bd6?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "bodycon, cutout, party, sexy"
            },

            // --- Athleisure & Comfort ---
            {
                name: "Ribbed Matching Set",
                description: "Coordinated ribbed tank and legging set in heather grey. Elevated loungewear.",
                price: 85.00,
                category: "Sets",
                brand: "Alo Yoga",
                images: [
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "athleisure, matching set, ribbed, lounge"
            },
            {
                name: "Oversized Hoodie Dress",
                description: "Slouchy hoodie dress in soft fleece. Comfort meets style.",
                price: 75.00,
                category: "Dresses",
                brand: "Sporty & Rich",
                images: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "hoodie, oversized, comfort, athleisure"
            },
            {
                name: "High-Waist Flare Leggings",
                description: "Buttery soft flare leggings with crossover waistband. Flattering fit.",
                price: 68.00,
                category: "Trousers",
                brand: "Gymshark",
                images: [
                    "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "leggings, flare, athleisure, high-waist"
            },

            // --- Unique Statement Pieces ---
            {
                name: "Mesh Long Sleeve Top",
                description: "Sheer mesh long sleeve in black. Perfect layering piece for edgy looks.",
                price: 42.00,
                category: "Tops",
                brand: "Dolls Kill",
                images: [
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "mesh, sheer, layering, edgy"
            },
            {
                name: "Asymmetric Draped Skirt",
                description: "Avant-garde asymmetric skirt with sculptural draping. Artistic statement piece.",
                price: 165.00,
                category: "Trousers",
                brand: "Rick Owens",
                images: [
                    "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "asymmetric, avant-garde, draped, skirt"
            },
            {
                name: "Graphic Print Midi Skirt",
                description: "Bold abstract print midi skirt. Modern art meets fashion.",
                price: 125.00,
                category: "Trousers",
                brand: "Bershka",
                images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "print, midi skirt, graphic, bold"
            },

            // --- Men's Contemporary ---
            {
                name: "Relaxed Linen Shirt",
                description: "Lightweight linen shirt in natural beige. Effortless summer style.",
                price: 85.00,
                category: "Men's Shirt",
                brand: "Uniqlo",
                images: [
                    "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "linen, relaxed, summer, natural"
            },
            {
                name: "Slim Fit Merino Sweater",
                description: "Fine merino wool sweater in navy. Sophisticated layering essential.",
                price: 145.00,
                category: "Men's Shirt",
                brand: "J.Crew",
                images: [
                    "https://images.unsplash.com/photo-1620012253295-c15cc3fe631e?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "merino, sweater, slim fit, classic"
            },
            {
                name: "Pleated Chino Trousers",
                description: "Modern chinos with front pleats. Smart casual perfection.",
                price: 115.00,
                category: "Trousers",
                brand: "Banana Republic",
                images: [
                    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "chinos, pleated, smart casual, trousers"
            },

            // --- Sustainable & Eco-Friendly ---
            {
                name: "Organic Cotton Oversized Tee",
                description: "Soft organic cotton tee in vintage white. Sustainable basics done right.",
                price: 45.00,
                category: "Tops",
                brand: "Patagonia",
                images: [
                    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "organic, sustainable, oversized, basics"
            },
            {
                name: "Recycled Polyester Track Jacket",
                description: "Sleek track jacket made from recycled materials. Eco-conscious streetwear.",
                price: 95.00,
                category: "Jackets",
                brand: "Pangaia",
                images: [
                    "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "recycled, sustainable, track jacket, eco"
            },
            {
                name: "Tencel Utility Jumpsuit",
                description: "Sustainable tencel jumpsuit with utility pockets. Comfort and conscience.",
                price: 155.00,
                category: "Sets",
                brand: "Reformation",
                images: [
                    "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "tencel, sustainable, jumpsuit, utility"
            },

            // --- Bold Colors & Prints ---
            {
                name: "Electric Blue Blazer",
                description: "Statement blazer in vibrant electric blue. Make an entrance.",
                price: 195.00,
                category: "Women's Blazer",
                brand: "Topshop",
                images: [
                    "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "bold, blue, blazer, statement"
            },
            {
                name: "Zebra Print Mini Skirt",
                description: "Bold zebra print mini skirt. Wild and trendy.",
                price: 65.00,
                category: "Trousers",
                brand: "Zara",
                images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "zebra, print, mini skirt, animal print"
            },
            {
                name: "Neon Green Crop Hoodie",
                description: "Eye-catching neon green cropped hoodie. Festival-ready vibes.",
                price: 55.00,
                category: "Tops",
                brand: "H&M",
                images: [
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "neon, green, hoodie, bold"
            },

            // --- Luxury Finishing Touches ---
            {
                name: "Satin Midi Skirt",
                description: "Luxurious satin midi skirt in champagne. Elegant and fluid.",
                price: 135.00,
                category: "Trousers",
                brand: "Vince",
                images: [
                    "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "satin, midi skirt, luxe, elegant"
            },
            {
                name: "Leather Pencil Skirt",
                description: "Classic leather pencil skirt in black. Timeless sophistication.",
                price: 225.00,
                category: "Trousers",
                brand: "Theory",
                images: [
                    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "leather, pencil skirt, classic, sophisticated"
            },
            {
                name: "Cashmere Blend Wrap Coat",
                description: "Sumptuous cashmere blend wrap coat in caramel. Ultimate luxury outerwear.",
                price: 495.00,
                category: "Jackets",
                brand: "Club Monaco",
                images: [
                    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "cashmere, wrap coat, luxury, caramel"
            },

            // --- Casual Cool ---
            {
                name: "Vintage Band Tour Tee",
                description: "Licensed vintage band tee with tour dates. Authentic rock style.",
                price: 48.00,
                category: "Tops",
                brand: "Urban Outfitters",
                images: [
                    "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "vintage, band tee, graphic, rock"
            },
            {
                name: "Relaxed Fit Sweatpants",
                description: "Premium French terry sweatpants in charcoal. Elevated comfort.",
                price: 75.00,
                category: "Trousers",
                brand: "Reigning Champ",
                images: [
                    "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "sweatpants, relaxed, comfort, premium"
            },
            {
                name: "Denim Trucker Vest",
                description: "Sleeveless denim trucker vest. Layer it for instant cool factor.",
                price: 65.00,
                category: "Jackets",
                brand: "Wrangler",
                images: [
                    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80"
                ],
                tags: "denim, vest, trucker, layering"
            }
        ];

        for (const item of modernCollection) {
            // Ensure each item has at least 3 images by duplicating if needed
            while (item.images.length < 3) {
                item.images.push(item.images[item.images.length - 1]);
            }

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
