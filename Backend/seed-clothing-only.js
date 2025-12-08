const mongoose = require('mongoose');
const Item = require('./src/models/Item');
const User = require('./src/models/User');
require('dotenv').config();

// GenZ Fashion Categories (NO ACCESSORIES)
const CATEGORIES = {
    STREETWEAR: 'Streetwear',
    Y2K: 'Y2K Fashion',
    MINIMALIST: 'Minimalist',
    ATHLEISURE: 'Athleisure',
    PARTY: 'Party & Evening',
    KOREAN: 'Korean Fashion',
    OUTERWEAR: 'Outerwear',
    VINTAGE: 'Vintage Style'
};

// Map DummyJSON categories to GenZ fashion (CLOTHING ONLY)
const CATEGORY_MAP = {
    'womens-dresses': CATEGORIES.PARTY,
    'womens-shoes': CATEGORIES.Y2K,
    'mens-shirts': CATEGORIES.MINIMALIST,
    'mens-shoes': CATEGORIES.STREETWEAR,
    'tops': CATEGORIES.ATHLEISURE
};

// Fetch ONLY clothing categories from DummyJSON
const DUMMYJSON_CATEGORIES = [
    'womens-dresses',
    'tops',
    'mens-shirts'
];

async function seedGenZClothing() {
    try {
        console.log('🌱 Starting GenZ Fashion Seed (CLOTHING ONLY with Real Images)...');

        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        let admin = await User.findOne({ email: 'admin@stylee.com' });

        if (!admin) {
            console.log('Creating admin user...');
            admin = await User.create({
                name: 'Admin User',
                email: 'admin@stylee.com',
                password: 'adminpassword123',
                role: 'ADMIN'
            });
        }
        console.log(`✅ Using admin: ${admin.email}`);

        console.log('🗑️  Clearing existing items...');
        await Item.deleteMany({});
        console.log('✅ Cleared existing items');

        const allProducts = [];

        // Fetch clothing from DummyJSON API
        for (const category of DUMMYJSON_CATEGORIES) {
            try {
                console.log(`📥 Fetching ${category}...`);
                const response = await fetch(`https://dummyjson.com/products/category/${category}`);
                const data = await response.json();

                if (data.products && data.products.length > 0) {
                    console.log(`   Found ${data.products.length} products`);

                    const mappedProducts = data.products.map(p => ({
                        name: p.title,
                        description: p.description,
                        price: p.price,
                        category: CATEGORY_MAP[category],
                        brand: p.brand || 'StyleLab',
                        color: null,
                        size: 'S/M/L/XL',
                        images: p.images || [],
                        tags: p.tags ? p.tags.join(', ') : category,
                        stock: p.stock || 50,
                        popularity: Math.floor((p.rating || 4) * 20),
                        createdBy: admin._id
                    }));

                    allProducts.push(...mappedProducts);
                }
            } catch (err) {
                console.error(`   ❌ Error fetching ${category}:`, err.message);
            }
        }

        // Add Curated Korean & Trendy Fashion (with unique images from Picsum)
        console.log('📥 Adding curated Korean & Trendy GenZ fashion...');

        const curatedProducts = [
            // Korean Fashion
            {
                name: "Oversized Cardigan Cream Cable Knit",
                description: "Chunky cable knit cardigan with oversized fit. Cozy Korean grandpa-core vibes perfect for layering.",
                price: 135.00,
                category: CATEGORIES.KOREAN,
                brand: "Seoul Style",
                color: "Cream",
                size: "Free Size",
                images: [
                    "https://picsum.photos/seed/korean-cardigan-1/800/1000",
                    "https://picsum.photos/seed/korean-cardigan-2/800/1000",
                    "https://picsum.photos/seed/korean-cardigan-3/800/1000"
                ],
                tags: "korean, cardigan, oversized, cable knit, cozy",
                stock: 32,
                popularity: 93
            },
            {
                name: "Pleated Mini Skirt Black",
                description: "Classic pleated tennis skirt in black. Essential Korean street style piece with elastic waistband.",
                price: 48.00,
                category: CATEGORIES.KOREAN,
                brand: "Seoul Style",
                color: "Black",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/pleated-skirt-1/800/1000",
                    "https://picsum.photos/seed/pleated-skirt-2/800/1000",
                    "https://picsum.photos/seed/pleated-skirt-3/800/1000"
                ],
                tags: "korean, pleated skirt, mini, tennis skirt, cute",
                stock: 58,
                popularity: 91
            },
            {
                name: "Bubble Sleeve Blouse White",
                description: "Romantic blouse with bubble sleeves and peter pan collar. Korean fashion essential with delicate details.",
                price: 72.00,
                category: CATEGORIES.KOREAN,
                brand: "Seoul Style",
                color: "White",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/bubble-blouse-1/800/1000",
                    "https://picsum.photos/seed/bubble-blouse-2/800/1000",
                    "https://picsum.photos/seed/bubble-blouse-3/800/1000"
                ],
                tags: "korean, blouse, bubble sleeve, romantic, cute",
                stock: 42,
                popularity: 90
            },
            {
                name: "High Waist Plaid Pants",
                description: "Wide-leg plaid trousers with high waist. Korean preppy style perfect for campus looks.",
                price: 98.00,
                category: CATEGORIES.KOREAN,
                brand: "Seoul Style",
                color: "Grey Plaid",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/plaid-pants-1/800/1000",
                    "https://picsum.photos/seed/plaid-pants-2/800/1000",
                    "https://picsum.photos/seed/plaid-pants-3/800/1000"
                ],
                tags: "korean, plaid, wide-leg, preppy, pants",
                stock: 38,
                popularity: 89
            },

            // Streetwear  
            {
                name: "Oversized Graphic Hoodie Black",
                description: "Premium heavyweight hoodie with abstract wave graphics. Dropped shoulders and kangaroo pocket.",
                price: 68.00,
                category: CATEGORIES.STREETWEAR,
                brand: "Urban Collective",
                color: "Black",
                size: "M/L/XL",
                images: [
                    "https://picsum.photos/seed/hoodie-black-1/800/1000",
                    "https://picsum.photos/seed/hoodie-black-2/800/1000",
                    "https://picsum.photos/seed/hoodie-black-3/800/1000"
                ],
                tags: "streetwear, oversized, hoodie, graphic, urban",
                stock: 45,
                popularity: 92
            },
            {
                name: "Cargo Utility Pants Olive",
                description: "Multi-pocket tactical cargo pants with adjustable straps. Tapered fit with ankle zippers.",
                price: 95.00,
                category: CATEGORIES.STREETWEAR,
                brand: "TechWear Labs",
                color: "Olive Green",
                size: "S/M/L/XL",
                images: [
                    "https://picsum.photos/seed/cargo-olive-1/800/1000",
                    "https://picsum.photos/seed/cargo-olive-2/800/1000",
                    "https://picsum.photos/seed/cargo-olive-3/800/1000"
                ],
                tags: "cargo, streetwear, techwear, utility, pants",
                stock: 38,
                popularity: 88
            },
            {
                name: "Puffer Jacket Glossy Black",
                description: "High-shine cropped puffer jacket. Water-resistant with synthetic down fill.",
                price: 145.00,
                category: CATEGORIES.STREETWEAR,
                brand: "Arctic Street",
                color: "Black",
                size: "S/M/L",
                images: [
                    "https://picsum.photos/seed/puffer-black-1/800/1000",
                    "https://picsum.photos/seed/puffer-black-2/800/1000",
                    "https://picsum.photos/seed/puffer-black-3/800/1000"
                ],
                tags: "puffer, jacket, winter, streetwear, glossy",
                stock: 28,
                popularity: 90
            },

            // Y2K Fashion
            {
                name: "Baby Tee Butterfly Print Pink",
                description: "Fitted baby tee in bubblegum pink with vintage butterfly graphic. Pure 2000s nostalgia.",
                price: 32.00,
                category: CATEGORIES.Y2K,
                brand: "Retro Revival",
                color: "Pink",
                size: "XS/S/M",
                images: [
                    "https://picsum.photos/seed/babytee-pink-1/800/1000",
                    "https://picsum.photos/seed/babytee-pink-2/800/1000",
                    "https://picsum.photos/seed/babytee-pink-3/800/1000"
                ],
                tags: "Y2K, baby tee, butterfly, pink, vintage",
                stock: 60,
                popularity: 91
            },
            {
                name: "Velour Tracksuit Set Hot Pink",
                description: "Plush velour zip-up hoodie and matching pants. Juicy Couture inspired set.",
                price: 125.00,
                category: CATEGORIES.Y2K,
                brand: "Velvet Dreams",
                color: "Hot Pink",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/velour-pink-1/800/1000",
                    "https://picsum.photos/seed/velour-pink-2/800/1000",
                    "https://picsum.photos/seed/velour-pink-3/800/1000"
                ],
                tags: "Y2K, velour, tracksuit, juicy, pink",
                stock: 30,
                popularity: 93
            },
            {
                name: "Low Rise Cargo Jeans",
                description: "Vintage-inspired low-rise cargo jeans with utility pockets. Early 2000s aesthetic.",
                price: 98.00,
                category: CATEGORIES.Y2K,
                brand: "Retro Revival",
                color: "Light Blue",
                size: "24/26/28/30",
                images: [
                    "https://picsum.photos/seed/cargo-jeans-1/800/1000",
                    "https://picsum.photos/seed/cargo-jeans-2/800/1000",
                    "https://picsum.photos/seed/cargo-jeans-3/800/1000"
                ],
                tags: "Y2K, cargo, low-rise, jeans, denim",
                stock: 35,
                popularity: 89
            },

            // Minimalist
            {
                name: "Cashmere Turtleneck Camel",
                description: "100% cashmere turtleneck sweater. Luxuriously soft and warm investment piece.",
                price: 220.00,
                category: CATEGORIES.MINIMALIST,
                brand: "Luxury Basics",
                color: "Camel",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/cashmere-camel-1/800/1000",
                    "https://picsum.photos/seed/cashmere-camel-2/800/1000",
                    "https://picsum.photos/seed/cashmere-camel-3/800/1000"
                ],
                tags: "minimalist, cashmere, turtleneck, luxury, winter",
                stock: 20,
                popularity: 95
            },
            {
                name: "Wide Leg Trousers Cream",
                description: "High-waisted wide-leg trousers with pleats. Flowy and elegant.",
                price: 110.00,
                category: CATEGORIES.MINIMALIST,
                brand: "Essentials Co",
                color: "Cream",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/trousers-cream-1/800/1000",
                    "https://picsum.photos/seed/trousers-cream-2/800/1000",
                    "https://picsum.photos/seed/trousers-cream-3/800/1000"
                ],
                tags: "minimalist, wide-leg, trousers, elegant, workwear",
                stock: 42,
                popularity: 87
            },

            // Athleisure
            {
                name: "Ribbed Matching Set Grey",
                description: "Coordinated ribbed sports bra and legging set. Soft stretchy and supportive.",
                price: 85.00,
                category: CATEGORIES.ATHLEISURE,
                brand: "Active Luxe",
                color: "Heather Grey",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/ribbed-set-grey-1/800/1000",
                    "https://picsum.photos/seed/ribbed-set-grey-2/800/1000",
                    "https://picsum.photos/seed/ribbed-set-grey-3/800/1000"
                ],
                tags: "athleisure, matching set, ribbed, yoga, lounge",
                stock: 44,
                popularity: 90
            },
            {
                name: "Cropped Hoodie Lavender",
                description: "Soft fleece cropped hoodie with drawstring. Perfect athleisure piece.",
                price: 58.00,
                category: CATEGORIES.ATHLEISURE,
                brand: "Cozy Club",
                color: "Lavender",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/crop-hoodie-lav-1/800/1000",
                    "https://picsum.photos/seed/crop-hoodie-lav-2/800/1000",
                    "https://picsum.photos/seed/crop-hoodie-lav-3/800/1000"
                ],
                tags: "athleisure, cropped hoodie, lavender, cozy, activewear",
                stock: 48,
                popularity: 87
            },

            // Outerwear
            {
                name: "Vintage Denim Jacket Light Wash",
                description: "Oversized trucker jacket in vintage light wash with distressed details.",
                price: 120.00,
                category: CATEGORIES.OUTERWEAR,
                brand: "Denim House",
                color: "Light Blue",
                size: "S/M/L/XL",
                images: [
                    "https://picsum.photos/seed/denim-jacket-1/800/1000",
                    "https://picsum.photos/seed/denim-jacket-2/800/1000",
                    "https://picsum.photos/seed/denim-jacket-3/800/1000"
                ],
                tags: "denim jacket, vintage, oversized, trucker, casual",
                stock: 35,
                popularity: 91
            },
            {
                name: "Oversized Flannel Shacket Plaid",
                description: "Cozy oversized flannel shirt jacket in classic red plaid. Perfect layering piece.",
                price: 72.00,
                category: CATEGORIES.OUTERWEAR,
                brand: "Cozy Club",
                color: "Red Plaid",
                size: "S/M/L",
                images: [
                    "https://picsum.photos/seed/flannel-plaid-1/800/1000",
                    "https://picsum.photos/seed/flannel-plaid-2/800/1000",
                    "https://picsum.photos/seed/flannel-plaid-3/800/1000"
                ],
                tags: "outerwear, flannel, shacket, plaid, oversized",
                stock: 42,
                popularity: 88
            },

            // Vintage Style
            {
                name: "Mom Jeans Light Wash",
                description: "High-waisted mom jeans with relaxed fit. Vintage-inspired with subtle distressing.",
                price: 88.00,
                category: CATEGORIES.VINTAGE,
                brand: "Denim House",
                color: "Light Blue",
                size: "24/26/28/30/32",
                images: [
                    "https://picsum.photos/seed/mom-jeans-1/800/1000",
                    "https://picsum.photos/seed/mom-jeans-2/800/1000",
                    "https://picsum.photos/seed/mom-jeans-3/800/1000"
                ],
                tags: "vintage, mom jeans, high-waist, denim, casual",
                stock: 48,
                popularity: 90
            },
            {
                name: "Tie Dye Crop Sweatshirt",
                description: "Trendy tie-dye cropped sweatshirt in pastel colors. Soft and cozy.",
                price: 48.00,
                category: CATEGORIES.Y2K,
                brand: "Retro Revival",
                color: "Pastel Multi",
                size: "XS/S/M/L",
                images: [
                    "https://picsum.photos/seed/tiedye-crop-1/800/1000",
                    "https://picsum.photos/seed/tiedye-crop-2/800/1000",
                    "https://picsum.photos/seed/tiedye-crop-3/800/1000"
                ],
                tags: "Y2K, tie-dye, crop, sweatshirt, pastel",
                stock: 48,
                popularity: 89
            }
        ];

        allProducts.push(...curatedProducts.map(p => ({
            ...p,
            createdBy: admin._id
        })));

        if (allProducts.length > 0) {
            console.log(`\n📦 Inserting ${allProducts.length} clothing products...`);
            const result = await Item.insertMany(allProducts);
            console.log(`✅ Successfully added ${result.length} products!`);

            const categoryCount = await Item.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);

            console.log('\n📊 Category Breakdown:');
            categoryCount.forEach(cat => {
                console.log(`   ${cat._id}: ${cat.count} items`);
            });

            console.log('\n✨ Seed completed!');
            console.log(`🎉 Total products: ${result.length}`);
            console.log('👕 CLOTHING ONLY - No accessories!');
            console.log('📸 Each product has unique real images!');
        }

    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    }
}

seedGenZClothing();
