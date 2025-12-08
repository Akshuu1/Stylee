const mongoose = require('mongoose');
const Item = require('./src/models/Item');
const User = require('./src/models/User');
require('dotenv').config();

// Modern GenZ Fashion Categories
const CATEGORIES = {
    STREETWEAR: 'Streetwear',
    Y2K: 'Y2K Fashion',
    MINIMALIST: 'Minimalist',
    ATHLEISURE: 'Athleisure',
    PARTY: 'Party & Evening',
    DENIM: 'Denim',
    OUTERWEAR: 'Outerwear',
    KOREAN_FASHION: 'Korean Fashion',
    ACCESSORIES: 'Accessories'
};

// Map DummyJSON categories to our GenZ categories
const CATEGORY_MAP = {
    'womens-dresses': CATEGORIES.PARTY,
    'womens-shoes': CATEGORIES.Y2K,
    'mens-shirts': CATEGORIES.MINIMALIST,
    'mens-shoes': CATEGORIES.STREETWEAR,
    'womens-bags': CATEGORIES.ACCESSORIES,
    'womens-jewellery': CATEGORIES.ACCESSORIES,
    'tops': CATEGORIES.ATHLEISURE,
    'sunglasses': CATEGORIES.ACCESSORIES,
    'mens-watches': CATEGORIES.ACCESSORIES,
    'womens-watches': CATEGORIES.ACCESSORIES,
    'beauty': CATEGORIES.ACCESSORIES,
    'fragrances': CATEGORIES.ACCESSORIES,
    'skin-care': CATEGORIES.ACCESSORIES,
    'furniture': CATEGORIES.OUTERWEAR,
    'home-decoration': CATEGORIES.KOREAN_FASHION,
    'smartphones': CATEGORIES.DENIM,
    'laptops': CATEGORIES.OUTERWEAR
};

// DummyJSON categories to fetch (expanded list)
const DUMMYJSON_CATEGORIES = [
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'womens-bags',
    'tops',
    'sunglasses',
    'mens-watches',
    'womens-watches',
    'womens-jewellery',
    'beauty',
    'fragrances',
    'skin-care',
    'smartphones',
    'laptops'
];

async function seedWithRealProducts() {
    try {
        console.log('🌱 Starting GenZ Fashion Seed with REAL Product Images...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Find or create admin user
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
        console.log(`✅ Using admin: ${admin.email} (ID: ${admin._id})`);

        // Clear existing items
        console.log('🗑️  Clearing existing items...');
        await Item.deleteMany({});
        console.log('✅ Cleared existing items');

        let totalAdded = 0;
        const allProducts = [];

        // Fetch products from DummyJSON API
        for (const category of DUMMYJSON_CATEGORIES) {
            try {
                console.log(`📥 Fetching ${category}...`);
                const response = await fetch(`https://dummyjson.com/products/category/${category}`);
                const data = await response.json();

                if (data.products && data.products.length > 0) {
                    console.log(`   Found ${data.products.length} products`);

                    // Map products to our schema
                    const mappedProducts = data.products.map(p => ({
                        name: p.title,
                        description: p.description,
                        price: p.price,
                        category: CATEGORY_MAP[category] || CATEGORIES.MINIMALIST,
                        brand: p.brand || 'StyleLab',
                        color: null,
                        size: category.includes('shoes') ? '7/8/9/10' : 'S/M/L',
                        images: p.images || [],  // DummyJSON provides multiple product images!
                        tags: p.tags ? p.tags.join(', ') : category,
                        stock: p.stock || 50,
                        popularity: Math.floor((p.rating || 4) * 20),
                        createdBy: admin._id
                    }));

                    allProducts.push(...mappedProducts);
                    totalAdded += mappedProducts.length;
                }
            } catch (err) {
                console.error(`   ❌ Error fetching ${category}:`, err.message);
            }
        }

        // Insert all products
        if (allProducts.length > 0) {
            console.log(`\n📦 Inserting ${allProducts.length} products...`);
            const result = await Item.insertMany(allProducts);
            console.log(`✅ Successfully added ${result.length} products!`);

            // Show category breakdown
            const categoryCount = await Item.aggregate([
                { $group: { _id: '$category', count: { $sum: 1 } } },
                { $sort: { count: -1 } }
            ]);

            console.log('\n📊 Category Breakdown:');
            categoryCount.forEach(cat => {
                console.log(`   ${cat._id}: ${cat.count} items`);
            });

            console.log('\n✨ Seed completed successfully!');
            console.log(`🎉 Total products: ${result.length}`);
            console.log('📸 Each product has REAL images showing different angles!');
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

seedWithRealProducts();
