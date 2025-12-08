const mongoose = require('mongoose');
const Item = require('./src/models/Item');
const User = require('./src/models/User');
require('dotenv').config();

// GenZ Fashion Categories (CLOTHING ONLY)
const CATEGORIES = {
    STREETWEAR: 'Streetwear',
    Y2K: 'Y2K Fashion',
    MINIMALIST: 'Minimalist',
    ATHLEISURE: 'Athleisure',
    PARTY: 'Party & Evening',
    KOREAN: 'Korean Fashion',
    OUTERWEAR: 'Outerwear',
    DENIM: 'Denim'
};

// 1. Curated Unsplash Image Sets (Specific IDs to ensure accuracy)
// Grouped by Category to match descriptions
const UNSPLASH_SETS = {
    STREETWEAR: [
        [ // Set 1: Hoodie/Street
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?w=800&q=80",
            "https://images.unsplash.com/photo-1523396870-13f57279aba6?w=800&q=80"
        ],
        [ // Set 2: Edgy/Urban
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80",
            "https://images.unsplash.com/photo-1523396870-13f57279aba6?w=800&q=80",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
        ],
        [ // Set 3: Puffer/Jacket
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            "https://images.unsplash.com/photo-1559563458-527698bf5295?w=800&q=80"
        ],
        [ // Set 4: Urban Cool
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1529139574466-a302c2d56dc6?w=800&q=80",
            "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80"
        ],
        [ // Set 5: Oversized
            "https://images.unsplash.com/photo-1588117305388-c26eea353c91?w=800&q=80",
            "https://images.unsplash.com/photo-1601058268499-e52642d18d89?w=800&q=80",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80"
        ]
    ],
    KOREAN: [
        [ // Set 1: Soft/Cute
            "https://images.unsplash.com/photo-1582255018629-9d5ae2b82662?w=800&q=80",
            "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=800&q=80",
            "https://images.unsplash.com/photo-1549488497-6c84f5951f22?w=800&q=80"
        ],
        [ // Set 2: Cardigan/Knit
            "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80"
        ],
        [ // Set 3: Pleated Skirt/Uniform
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
        ],
        [ // Set 4: Chic Blouse
            "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=800&q=80",
            "https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=800&q=80",
            "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?w=800&q=80"
        ]
    ],
    Y2K: [
        [ // Set 1: Crop Top/Pink
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
            "https://images.unsplash.com/photo-1545959789-2bb4f944890d?w=800&q=80",
            "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=800&q=80"
        ],
        [ // Set 2: Denim/Skirt
            "https://images.unsplash.com/photo-1591118100954-4740b85295c5?w=800&q=80",
            "https://images.unsplash.com/photo-1582142327529-e85b9b008d3c?w=800&q=80",
            "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&q=80"
        ],
        [ // Set 3: Fun/Playful
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
            "https://images.unsplash.com/photo-1529139574466-a302c2d56dc6?w=800&q=80"
        ]
    ],
    MINIMALIST: [
        [ // Set 1: Clean/White
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=800&q=80",
            "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=800&q=80"
        ],
        [ // Set 2: Beige/Coat
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
            "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=800&q=80"
        ],
        [ // Set 3: Black/Sleek
            "https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=800&q=80",
            "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=800&q=80",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80"
        ]
    ],
    ATHLEISURE: [
        [ // Set 1: Yoga/Fit
            "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800&q=80",
            "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80",
            "https://images.unsplash.com/photo-1574680096141-1cddd32e04ca?w=800&q=80"
        ],
        [ // Set 2: Grey/Sweat
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
            "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&q=80",
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80"
        ]
    ],
    DENIM: [
        [ // Set 1: Jeans/Blue
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80"
        ],
        [ // Set 2: Jacket
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=800&q=80"
        ]
    ]
};


async function seedFinalCurated() {
    try {
        console.log('🌱 Starting Final Curated GenZ Seed (ACCURATE IMAGES)...');
        await mongoose.connect(process.env.MONGODB_URI);

        // Setup Admin
        let admin = await User.findOne({ email: 'admin@stylee.com' });
        if (!admin) {
            admin = await User.create({
                name: 'Admin User', email: 'admin@stylee.com', password: 'adminpassword123', role: 'ADMIN'
            });
        }

        // Clear Items
        await Item.deleteMany({});
        console.log('✅ Cleared existing items');

        const displayProducts = [];

        // 1. ADD FROM DUMMYJSON (High Quality, Multi-Angle)
        // We only pick specific categories that are definitely clothing/footwear (No jewelry/bags)
        const dummyCategories = ['womens-dresses', 'tops', 'mens-shirts', 'mens-shoes', 'womens-shoes'];
        const dummyMap = {
            'womens-dresses': CATEGORIES.PARTY,
            'tops': CATEGORIES.Y2K,
            'mens-shirts': CATEGORIES.MINIMALIST,
            'mens-shoes': CATEGORIES.STREETWEAR, // Sneakers
            'womens-shoes': CATEGORIES.Y2K // Platforms/Heels
        };

        for (const cat of dummyCategories) {
            try {
                const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
                const data = await res.json();
                if (data.products) {
                    data.products.forEach(p => {
                        // Create 2 variants of each DummyJSON product to fill catalog
                        // variant 1
                        displayProducts.push({
                            name: p.title,
                            description: p.description,
                            price: p.price,
                            category: dummyMap[cat],
                            brand: p.brand || 'GenZ Select',
                            images: p.images, // REAL MATCHING IMAGES
                            tags: [cat, 'fashion', 'trendy', 'original'],
                            stock: p.stock,
                            popularity: 90,
                            createdBy: admin._id
                        });
                        // variant 2 (Different Color/Vibe implied)
                        displayProducts.push({
                            name: `(Limited) ${p.title} - Alt Edition`,
                            description: `Exclusive colorway: ${p.description}`,
                            price: Math.floor(p.price * 1.2),
                            category: dummyMap[cat],
                            brand: p.brand || 'GenZ Select',
                            images: p.images, // Reuse images (common in seeds when limited)
                            tags: [cat, 'fashion', 'limited', 'exclusive'],
                            stock: Math.floor(p.stock / 2),
                            popularity: 95,
                            createdBy: admin._id
                        });
                    });
                }
            } catch (e) { console.error(e); }
        }

        // 2. ADD CURATED MANUAL PRODUCTS (To reach target count)
        // Using strict image sets so descriptions MATCH images

        // --- KOREAN FASHION ---
        displayProducts.push({
            name: "Soft Cream Cardigan",
            description: "Oversized cozy knit cardigan, perfect for the soft girl aesthetic.",
            price: 45, category: CATEGORIES.KOREAN, brand: "Seoul Studio",
            images: UNSPLASH_SETS.KOREAN[1], // Cardigan set
            tags: ['korean', 'cozy', 'knit'], stock: 30, popularity: 95, createdBy: admin._id
        });
        displayProducts.push({
            name: "Schoolgirl Pleated Skirt",
            description: "Classic high-waist pleated tennis skirt in black.",
            price: 35, category: CATEGORIES.KOREAN, brand: "Seoul Studio",
            images: UNSPLASH_SETS.KOREAN[2], // Skirt set
            tags: ['korean', 'skirt', 'school'], stock: 50, popularity: 92, createdBy: admin._id
        });
        displayProducts.push({
            name: "Romantic Bubble Blouse",
            description: "White blouse with dramatic puff sleeves and collar.",
            price: 55, category: CATEGORIES.KOREAN, brand: "Seoul Studio",
            images: UNSPLASH_SETS.KOREAN[3], // Blouse set
            tags: ['korean', 'blouse', 'chic'], stock: 25, popularity: 88, createdBy: admin._id
        });

        // --- STREETWEAR ---
        displayProducts.push({
            name: "Urban Graphic Hoodie",
            description: "Heavyweight black hoodie with back graphic.",
            price: 85, category: CATEGORIES.STREETWEAR, brand: "Urban Core",
            images: UNSPLASH_SETS.STREETWEAR[0], // Hoodie set
            tags: ['streetwear', 'hoodie', 'black'], stock: 40, popularity: 98, createdBy: admin._id
        });
        displayProducts.push({
            name: "Tech Fleece Utility Jacket",
            description: "Tactical streetwear jacket with multiple pockets.",
            price: 120, category: CATEGORIES.STREETWEAR, brand: "Urban Core",
            images: UNSPLASH_SETS.STREETWEAR[1], // Jacket set
            tags: ['streetwear', 'techwear', 'jacket'], stock: 15, popularity: 94, createdBy: admin._id
        });
        displayProducts.push({
            name: "Oversized Puffer Coat",
            description: "Massive down puffer jacket for winter styling.",
            price: 150, category: CATEGORIES.STREETWEAR, brand: "Urban Core",
            images: UNSPLASH_SETS.STREETWEAR[2], // Puffer set
            tags: ['streetwear', 'puffer', 'winter'], stock: 20, popularity: 91, createdBy: admin._id
        });

        // --- MINIMALIST ---
        displayProducts.push({
            name: "Essential White Linen Shirt",
            description: "Breathable linen shirt for a clean, minimal look.",
            price: 60, category: CATEGORIES.MINIMALIST, brand: "Basics",
            images: UNSPLASH_SETS.MINIMALIST[0], // White set
            tags: ['minimalist', 'white', 'linen'], stock: 60, popularity: 89, createdBy: admin._id
        });
        displayProducts.push({
            name: "Camel Trench Coat",
            description: "Classic longline trench coat in beige.",
            price: 180, category: CATEGORIES.MINIMALIST, brand: "Basics",
            images: UNSPLASH_SETS.MINIMALIST[1], // Camel set
            tags: ['minimalist', 'coat', 'classic'], stock: 10, popularity: 93, createdBy: admin._id
        });

        // --- Y2K ---
        displayProducts.push({
            name: "Pink Velour Crop Top",
            description: "2000s throwback crop top in velvet material.",
            price: 30, category: CATEGORIES.Y2K, brand: "Throwback",
            images: UNSPLASH_SETS.Y2K[0], // Pink set
            tags: ['y2k', 'pink', 'crop'], stock: 80, popularity: 96, createdBy: admin._id
        });
        displayProducts.push({
            name: "Distressed Denim Skirt",
            description: "Mini denim skirt with raw edge hem.",
            price: 45, category: CATEGORIES.Y2K, brand: "Throwback",
            images: UNSPLASH_SETS.Y2K[1], // Denim skirt set
            tags: ['y2k', 'denim', 'skirt'], stock: 40, popularity: 87, createdBy: admin._id
        });

        // --- ATHLEISURE ---
        displayProducts.push({
            name: "Performance Yoga Set",
            description: "Matching sports bra and leggings in charcoal.",
            price: 90, category: CATEGORIES.ATHLEISURE, brand: "Active",
            images: UNSPLASH_SETS.ATHLEISURE[0], // Yoga set
            tags: ['athleisure', 'gym', 'active'], stock: 55, popularity: 92, createdBy: admin._id
        });

        // --- DENIM ---
        displayProducts.push({
            name: "Vintage Wash Jeans",
            description: "Straight leg jeans with a classic vintage wash.",
            price: 70, category: CATEGORIES.DENIM, brand: "Blue Gen",
            images: UNSPLASH_SETS.DENIM[0], // Jeans set
            tags: ['denim', 'jeans', 'vintage'], stock: 45, popularity: 90, createdBy: admin._id
        });


        // INSERT
        console.log(`📦 Inserting ${displayProducts.length} Strictly Curated Clothing Products...`);
        await Item.insertMany(displayProducts);
        console.log(`✅ Success! Added ${displayProducts.length} items.`);
        console.log("Note: Used specific Unsplash IDs for manual items to ensure image validity.");

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
}

seedFinalCurated();
