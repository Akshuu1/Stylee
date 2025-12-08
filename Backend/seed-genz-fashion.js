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
    VINTAGE: 'Vintage Core',
    ACCESSORIES: 'Accessories',
    KOREAN_FASHION: 'Korean Fashion'
};

// Curated Modern GenZ Fashion Products (70+ items)
const genzProducts = [
    // ===== STREETWEAR (12 items) =====
    {
        name: "Oversized Graphic Hoodie - Black Wave",
        description: "Premium heavyweight hoodie with abstract wave graphics. Features dropped shoulders, kangaroo pocket, and ribbed cuffs. Perfect oversized fit for that street-ready look.",
        price: 68.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "Black",
        size: "M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "streetwear, oversized, hoodie, graphic, urban",
        stock: 45,
        popularity: 92
    },
    {
        name: "Cargo Utility Pants - Olive Green",
        description: "Multi-pocket tactical cargo pants with adjustable straps and buckles. Tapered fit with ankle zippers. Essential techwear piece.",
        price: 95.00,
        category: CATEGORIES.STREETWEAR,
        brand: "TechWear Labs",
        color: "Olive Green",
        size: "S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "cargo, streetwear, techwear, utility, pants",
        stock: 38,
        popularity: 88
    },
    {
        name: "Distressed Band Tee - Vintage Black",
        description: "Oversized graphic band tee with intentional distressing and vintage wash. Soft cotton with crew neck. Perfect for layering.",
        price: 42.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Thrift Culture",
        color: "Black",
        size: "M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1523396870777-191237e17271?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80"
        ],
        tags: "vintage, band tee, distressed, oversized, grunge",
        stock: 52,
        popularity: 85
    },
    {
        name: "Puffer Jacket - Glossy Black",
        description: "High-shine cropped puffer jacket with oversized fit. Water-resistant shell with synthetic down fill. Statement winter piece.",
        price: 145.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Arctic Street",
        color: "Black",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "puffer, jacket, winter, streetwear, glossy",
        stock: 28,
        popularity: 90
    },
    {
        name: "Parachute Joggers - Cream",
        description: "Lightweight parachute material joggers with elasticated waist and cuffs. Side utility pockets. Comfortable and stylish.",
        price: 78.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "Cream",
        size: "S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "joggers, parachute, streetwear, casual, comfortable",
        stock: 40,
        popularity: 87
    },
    {
        name: "Bomber Jacket - Techwear Edition",
        description: "Water-resistant bomber with multiple straps, buckles, and utility pockets. Cyberpunk aesthetic meets functionality.",
        price: 185.00,
        category: CATEGORIES.STREETWEAR,
        brand: "TechWear Labs",
        color: "Black/Grey",
        size: "M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "techwear, bomber, cyberpunk, utility, jacket",
        stock: 22,
        popularity: 94
    },

    // ===== Y2K FASHION (10 items) =====
    {
        name: "Baby Tee - Butterfly Print",
        description: "Fitted baby tee in bubblegum pink with vintage butterfly graphic. Ribbed crew neck. Pure 2000s nostalgia.",
        price: 32.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Pink",
        size: "XS/S/M",
        images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, baby tee, butterfly, pink, vintage",
        stock: 60,
        popularity: 91
    },
    {
        name: "Low-Rise Cargo Jeans",
        description: "Vintage-inspired low-rise cargo jeans with utility pockets and belt loops. Light wash denim. Early 2000s aesthetic.",
        price: 98.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Light Blue",
        size: "24/26/28/30",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, cargo, low-rise, jeans, denim",
        stock: 35,
        popularity: 89
    },
    {
        name: "Velour Tracksuit Set - Hot Pink",
        description: "Plush velour zip-up hoodie and matching pants. Juicy Couture inspired. Ultimate Y2K flex.",
        price: 125.00,
        category: CATEGORIES.Y2K,
        brand: "Velvet Dreams",
        color: "Hot Pink",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, velour, tracksuit, juicy, pink",
        stock: 30,
        popularity: 93
    },
    {
        name: "Halter Neck Crop Top",
        description: "Stretchy ribbed halter top in lilac. Backless design with tie closure. Perfect for summer nights.",
        price: 38.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Lilac",
        size: "XS/S/M",
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, halter, crop top, backless, summer",
        stock: 48,
        popularity: 86
    },
    {
        name: "Butterfly Clips Hair Set",
        description: "Set of 12 colorful butterfly hair clips in assorted colors. Essential Y2K hair accessory.",
        price: 18.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Multi",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb05220c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1602751584552-8ba42d523f87?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, butterfly, hair clips, accessories, colorful",
        stock: 75,
        popularity: 82
    },

    // ===== MINIMALIST (12 items) =====
    {
        name: "Ribbed Cotton Crop Top - Ivory",
        description: "Seamless ribbed crop top in soft ivory. Perfect for layering with high-waisted pieces. Minimalist essential.",
        price: 35.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Ivory",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, crop top, ribbed, basic, ivory",
        stock: 65,
        popularity: 88
    },
    {
        name: "Cashmere Turtleneck - Camel",
        description: "100% cashmere turtleneck sweater. Luxuriously soft and warm. Investment winter piece.",
        price: 220.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Luxury Basics",
        color: "Camel",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, cashmere, turtleneck, luxury, winter",
        stock: 20,
        popularity: 95
    },
    {
        name: "Wide Leg Trousers - Cream",
        description: "High-waisted wide-leg trousers with pleats. Flowy and elegant. Perfect for work or casual outings.",
        price: 110.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Cream",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, wide-leg, trousers, elegant, workwear",
        stock: 42,
        popularity: 87
    },
    {
        name: "Oversized White Oxford Shirt",
        description: "Crisp cotton oxford with dropped shoulders. Effortlessly chic and versatile.",
        price: 75.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "White",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618333261702-8e5c3e00e3f6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, oxford, oversized, white, classic",
        stock: 50,
        popularity: 90
    },
    {
        name: "Black Turtleneck Bodysuit",
        description: "Seamless ribbed bodysuit with turtleneck. Sleek silhouette perfect for layering.",
        price: 58.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, bodysuit, turtleneck, black, sleek",
        stock: 55,
        popularity: 89
    },
    {
        name: "Longline Camel Coat",
        description: "Classic double-breasted wool coat in camel. Timeless investment outerwear piece.",
        price: 395.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Luxury Basics",
        color: "Camel",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, camel coat, wool, classic, investment",
        stock: 15,
        popularity: 96
    },

    // ===== ATHLEISURE (8 items) =====
    {
        name: "Ribbed Matching Set - Heather Grey",
        description: "Coordinated ribbed sports bra and legging set. Soft, stretchy, and supportive. Perfect for yoga or lounging.",
        price: 85.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Active Luxe",
        color: "Heather Grey",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, matching set, ribbed, yoga, lounge",
        stock: 44,
        popularity: 90
    },
    {
        name: "Oversized Hoodie Dress - Sage",
        description: "Slouchy hoodie dress in soft fleece. Comfort meets style. Perfect for cozy days.",
        price: 75.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Cozy Club",
        color: "Sage Green",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, hoodie dress, oversized, cozy, comfort",
        stock: 38,
        popularity: 87
    },
    {
        name: "High-Waist Flare Leggings - Black",
        description: "Buttery soft flare leggings with crossover waistband. Flattering and comfortable fit.",
        price: 68.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Active Luxe",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, flare leggings, high-waist, yoga, comfortable",
        stock: 52,
        popularity: 88
    },
    {
        name: "Sports Bra - Seamless",
        description: "Medium support seamless sports bra with removable pads. Moisture-wicking fabric.",
        price: 42.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Active Luxe",
        color: "Dusty Rose",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, sports bra, seamless, workout, activewear",
        stock: 60,
        popularity: 85
    },

    // ===== PARTY & EVENING (10 items) =====
    {
        name: "Sequin Mini Dress - Silver",
        description: "All-over sequin mini dress with spaghetti straps. Show-stopping party piece that catches every light.",
        price: 185.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Silver",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572804013427-4d7ca726b711?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, sequin, mini dress, glam, evening",
        stock: 25,
        popularity: 94
    },
    {
        name: "Velvet Wrap Dress - Burgundy",
        description: "Luxurious velvet wrap dress with tie waist. Sophisticated evening elegance.",
        price: 165.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Burgundy",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572804013427-4d7ca726b711?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, velvet, wrap dress, evening, luxe",
        stock: 30,
        popularity: 92
    },
    {
        name: "Cut-Out Bodycon Dress - Black",
        description: "Sleek bodycon dress with strategic cutouts. Confident and sexy silhouette.",
        price: 95.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1623838029088-72ee9e414bd6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, bodycon, cutout, sexy, club",
        stock: 35,
        popularity: 89
    },
    {
        name: "Satin Slip Dress - Champagne",
        description: "Bias-cut satin slip dress with lace trim. Effortless evening elegance.",
        price: 145.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Champagne",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1623838029088-72ee9e414bd6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, satin, slip dress, elegant, sophisticated",
        stock: 28,
        popularity: 91
    },
    {
        name: "Emerald Sequin Gown",
        description: "Floor-length sequined gown in deep emerald. Red carpet ready.",
        price: 550.00,
        category: CATEGORIES.PARTY,
        brand: "Couture Dreams",
        color: "Emerald",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572804013427-4d7ca726b711?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "gown, sequin, emerald, luxury, formal",
        stock: 12,
        popularity: 97
    },

    // ===== DENIM (8 items) =====
    {
        name: "Mom Jeans - Light Wash",
        description: "High-waisted mom jeans with relaxed fit. Vintage-inspired light wash with subtle distressing.",
        price: 88.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Light Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, mom jeans, high-waist, vintage, casual",
        stock: 48,
        popularity: 90
    },
    {
        name: "Straight Leg Jeans - Dark Indigo",
        description: "Classic straight leg jeans in dark indigo wash. Timeless and versatile.",
        price: 98.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Dark Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, straight leg, dark wash, classic, jeans",
        stock: 55,
        popularity: 88
    },
    {
        name: "Wide Leg Barrel Jeans",
        description: "Modern barrel leg silhouette in mid-wash denim. Fashion-forward and comfortable.",
        price: 115.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Medium Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, barrel leg, wide leg, modern, trendy",
        stock: 40,
        popularity: 92
    },
    {
        name: "Vintage Flare Jeans",
        description: "High-rise flare jeans with vintage wash. 70s inspired silhouette.",
        price: 105.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Light Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, flare, vintage, 70s, high-rise",
        stock: 42,
        popularity: 87
    },

    // ===== OUTERWEAR (6 items) =====
    {
        name: "Vintage Denim Jacket - Light Wash",
        description: "Oversized trucker jacket in vintage light wash. Distressed details for a lived-in look.",
        price: 120.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Denim House",
        color: "Light Blue",
        size: "S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim jacket, vintage, oversized, trucker, casual",
        stock: 35,
        popularity: 91
    },
    {
        name: "Faux Leather Blazer - Black",
        description: "Edgy vegan leather blazer with structured shoulders. Modern rocker aesthetic.",
        price: 175.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Urban Edge",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "faux leather, blazer, edgy, vegan, jacket",
        stock: 28,
        popularity: 90
    },
    {
        name: "Shearling Aviator Jacket",
        description: "Cozy shearling-lined aviator jacket in cognac brown. Winter essential with vintage appeal.",
        price: 425.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Luxury Outerwear",
        color: "Brown",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "shearling, aviator, winter, luxury, jacket",
        stock: 18,
        popularity: 95
    },

    // ===== KOREAN FASHION (8 items) =====
    {
        name: "Oversized Cardigan - Cream Cable Knit",
        description: "Chunky cable knit cardigan with oversized fit. Cozy Korean grandpa-core vibes.",
        price: 135.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Cream",
        size: "Free Size",
        images: [
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, cardigan, oversized, cable knit, cozy",
        stock: 32,
        popularity: 93
    },
    {
        name: "Pleated Mini Skirt - Black",
        description: "Classic pleated tennis skirt in black. Essential Korean street style piece.",
        price: 48.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, pleated skirt, mini, tennis skirt, cute",
        stock: 58,
        popularity: 91
    },
    {
        name: "Knit Polo Crop Top - Sage",
        description: "Fitted ribbed knit polo in sage green. Retro sportswear charm meets Korean fashion.",
        price: 65.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Sage Green",
        size: "XS/S/M",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, polo, crop top, knit, retro",
        stock: 45,
        popularity: 88
    },
    {
        name: "Oversized Boyfriend Blazer - Beige",
        description: "Boxy fit blazer in neutral beige. Perfect Korean office-to-dinner piece.",
        price: 180.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Beige",
        size: "Free Size",
        images: [
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, blazer, oversized, boyfriend, chic",
        stock: 30,
        popularity: 92
    },

    // ===== MORE STREETWEAR (6 items) =====
    {
        name: "Graphic Print Windbreaker",
        description: "Lightweight windbreaker with bold graphic prints. Perfect for layering with streetwear fits.",
        price: 92.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "Multi",
        size: "M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "windbreaker, graphic, streetwear, jacket, lightweight",
        stock: 36,
        popularity: 86
    },
    {
        name: "High-Top Sneakers - White/Black",
        description: "Classic high-top sneakers with premium leather. Timeless streetwear essential.",
        price: 135.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "White/Black",
        size: "7/8/9/10/11",
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560343076-ec3408845037?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "sneakers, high-top, streetwear, shoes, classic",
        stock: 45,
        popularity: 93
    },
    {
        name: "Chain Crossbody Bag",
        description: "Mini crossbody bag with chain strap. Perfect streetwear accessory.",
        price: 68.00,
        category: CATEGORIES.ACCESSORIES,
        brand: "Urban Collective",
        color: "Black",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "bag, crossbody, chain, accessory, streetwear",
        stock: 40,
        popularity: 84
    },

    // ===== MORE Y2K (5 items) =====
    {
        name: "Mini Shoulder Bag - Pink",
        description: "Tiny Y2K shoulder bag in hot pink. Perfect size for essentials.",
        price: 45.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Pink",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, shoulder bag, mini, pink, accessories",
        stock: 50,
        popularity: 88
    },
    {
        name: "Platform Sandals - White",
        description: "Chunky platform sandals with adjustable straps. Y2K footwear essential.",
        price: 78.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "White",
        size: "6/7/8/9/10",
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560343076-ec3408845037?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, platform, sandals, shoes, chunky",
        stock: 38,
        popularity: 86
    },
    {
        name: "Graphic Baby Tee - White",
        description: "Fitted baby tee with retro graphic print. Essential Y2K wardrobe staple.",
        price: 28.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "White",
        size: "XS/S/M",
        images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, baby tee, graphic, white, fitted",
        stock: 65,
        popularity: 85
    },

    // ===== MORE MINIMALIST (6 items) =====
    {
        name: "Silk Slip Camisole - Champagne",
        description: "Delicate silk camisole with adjustable straps. Minimalist layering essential.",
        price: 88.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Champagne",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, silk, camisole, delicate, layering",
        stock: 35,
        popularity: 89
    },
    {
        name: "Tailored Straight Trousers - Black",
        description: "High-waisted tailored trousers with crisp pleats. Professional and polished.",
        price: 128.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, tailored, trousers, professional, black",
        stock: 40,
        popularity: 91
    },
    {
        name: "Merino Wool Sweater - Grey",
        description: "Slim-fit merino wool crew neck sweater. Soft, warm, and timeless.",
        price: 165.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Luxury Basics",
        color: "Grey",
        size: "XS/S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, merino wool, sweater, classic, grey",
        stock: 32,
        popularity: 90
    },

    // ===== MORE ATHLEISURE (4 items) =====
    {
        name: "Cropped Hoodie - Lavender",
        description: "Soft fleece cropped hoodie with drawstring. Perfect athleisure piece.",
        price: 58.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Cozy Club",
        color: "Lavender",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, cropped hoodie, lavender, cozy, activewear",
        stock: 48,
        popularity: 87
    },
    {
        name: "High-Waist Biker Shorts - Black",
        description: "Compression biker shorts with high waistband. Flattering and functional.",
        price: 38.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Active Luxe",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, biker shorts, high-waist, compression, workout",
        stock: 58,
        popularity: 88
    },
    {
        name: "Oversized Zip-Up Hoodie - Grey",
        description: "Relaxed fit zip-up hoodie in heather grey. Ultimate comfort piece.",
        price: 72.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Cozy Club",
        color: "Heather Grey",
        size: "S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, zip-up, hoodie, oversized, comfort",
        stock: 42,
        popularity: 86
    },

    // ===== MORE PARTY & EVENING (5 items) =====
    {
        name: "Metallic Pleated Midi Skirt",
        description: "Shimmering metallic pleated skirt. Perfect for festive occasions.",
        price: 95.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Gold",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, metallic, pleated, midi skirt, festive",
        stock: 30,
        popularity: 90
    },
    {
        name: "Lace Detail Bodysuit - Black",
        description: "Delicate lace bodysuit with snap closure. Elegant evening piece.",
        price: 68.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, lace, bodysuit, elegant, evening",
        stock: 35,
        popularity: 89
    },

    // ===== MORE DENIM (4 items) =====
    {
        name: "Denim Mini Skirt - Dark Wash",
        description: "Classic denim mini skirt with button front. Versatile wardrobe essential.",
        price: 62.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Dark Blue",
        size: "24/26/28/30",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, mini skirt, dark wash, classic, versatile",
        stock: 52,
        popularity: 87
    },
    {
        name: "Ripped Boyfriend Jeans",
        description: "Relaxed boyfriend fit with distressed details. Casual cool aesthetic.",
        price: 95.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Light Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, boyfriend jeans, ripped, casual, distressed",
        stock: 44,
        popularity: 89
    },

    // ===== MORE OUTERWEAR (3 items) =====
    {
        name: "Quilted Puffer Coat - Cream",
        description: "Longline quilted puffer in cream. Warm and stylish winter essential.",
        price: 195.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Arctic Street",
        color: "Cream",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "outerwear, puffer, quilted, winter, coat",
        stock: 25,
        popularity: 91
    },
    {
        name: "Wool Blend Peacoat - Navy",
        description: "Classic double-breasted peacoat. Timeless winter staple.",
        price: 225.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Luxury Outerwear",
        color: "Navy",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "outerwear, peacoat, wool, navy, classic",
        stock: 22,
        popularity: 92
    },

    // ===== MORE KOREAN FASHION (4 items) =====
    {
        name: "Bubble Sleeve Blouse - White",
        description: "Romantic blouse with bubble sleeves and peter pan collar. Korean fashion essential.",
        price: 72.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "White",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618333261702-8e5c3e00e3f6?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, blouse, bubble sleeve, romantic, cute",
        stock: 42,
        popularity: 90
    },
    {
        name: "High-Waist Plaid Pants",
        description: "Wide-leg plaid trousers with high waist. Korean preppy style.",
        price: 98.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Grey Plaid",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, plaid, wide-leg, preppy, pants",
        stock: 38,
        popularity: 89
    },
    {
        name: "Corduroy Bucket Hat",
        description: "Soft corduroy bucket hat in neutral brown. Korean street style accessory.",
        price: 35.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Brown",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281e960?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, bucket hat, corduroy, accessory, streetstyle",
        stock: 60,
        popularity: 86
    },

    // ===== ADDITIONAL PRODUCTS TO REACH 75 (17 items) =====
    {
        name: "Cropped Puffer Vest - Neon Green",
        description: "Statement cropped puffer vest in eye-catching neon. Perfect layering piece for streetwear looks.",
        price: 88.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "Neon Green",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548126032-e51329b12a23?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "streetwear, puffer vest, neon, cropped, statement",
        stock: 30,
        popularity: 88
    },
    {
        name: "Mini Skort - Tennis White",
        description: "Athletic mini skort with built-in shorts. Perfect for active days and cute fits.",
        price: 52.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "White",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, skort, tennis, white, athletic",
        stock: 45,
        popularity: 87
    },
    {
        name: "Mesh Long Sleeve Top - Black",
        description: "Sheer mesh long sleeve perfect for layering. Edgy and versatile.",
        price: 38.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, mesh, sheer, layering, edgy",
        stock: 55,
        popularity: 85
    },
    {
        name: "Yoga Mat Bag - Canvas",
        description: "Stylish canvas yoga mat carrier with adjustable strap. Athleisure essential.",
        price: 32.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Active Luxe",
        color: "Natural",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, yoga, mat bag, canvas, accessory",
        stock: 40,
        popularity: 83
    },
    {
        name: "Satin Scrunchie Set",
        description: "Set of 6 satin scrunchies in trendy colors. Hair accessory must-have.",
        price: 22.00,
        category: CATEGORIES.ACCESSORIES,
        brand: "Retro Revival",
        color: "Multi",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1515562141207-7a88fb05220c?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1602751584552-8ba42d523f87?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "accessories, scrunchies, satin, hair, trendy",
        stock: 80,
        popularity: 84
    },
    {
        name: "Statement Belt Bag - Quilted",
        description: "Trendy quilted belt bag in black. Hands-free and stylish.",
        price: 58.00,
        category: CATEGORIES.ACCESSORIES,
        brand: "Urban Collective",
        color: "Black",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "accessories, belt bag, quilted, trendy, handfree",
        stock: 50,
        popularity: 89
    },
    {
        name: "Strappy Heeled Sandals - Nude",
        description: "Elegant strappy heels perfect for parties and events. Comfortable 3-inch heel.",
        price: 85.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Nude",
        size: "6/7/8/9/10",
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560343076-ec3408845037?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, heels, sandals, strappy, elegant",
        stock: 35,
        popularity: 90
    },
    {
        name: "Cropped Denim Jacket - Black",
        description: "Edgy cropped denim jacket in black wash. Perfect layering piece.",
        price: 98.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Black",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, jacket, cropped, black, edgy",
        stock: 38,
        popularity: 91
    },
    {
        name: "Oversized Flannel Shacket - Plaid",
        description: "Cozy oversized flannel shirt jacket in classic plaid. Perfect for layering.",
        price: 72.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Cozy Club",
        color: "Red Plaid",
        size: "S/M/L",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "outerwear, flannel, shacket, plaid, oversized",
        stock: 42,
        popularity: 88
    },
    {
        name: "Knit Beanie - Chunky",
        description: "Chunky knit beanie in cream. Cozy winter accessory.",
        price: 28.00,
        category: CATEGORIES.KOREAN_FASHION,
        brand: "Seoul Style",
        color: "Cream",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1572635196237-14b3f281e960?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "korean, beanie, knit, winter, cozy",
        stock: 65,
        popularity: 86
    },
    {
        name: "Relaxed Sweatpants - Grey",
        description: "Soft fleece sweatpants with adjustable drawstring. Ultimate comfort.",
        price: 58.00,
        category: CATEGORIES.ATHLEISURE,
        brand: "Cozy Club",
        color: "Heather Grey",
        size: "XS/S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "athleisure, sweatpants, relaxed, comfort, cozy",
        stock: 60,
        popularity: 87
    },
    {
        name: "Rhinestone Mini Bag",
        description: "Sparkly rhinestone mini bag for special occasions. Statement party accessory.",
        price: 68.00,
        category: CATEGORIES.PARTY,
        brand: "Night Luxe",
        color: "Silver",
        size: "One Size",
        images: [
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1590874103328-eac65a683ce7?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "party, rhinestone, mini bag, sparkly, statement",
        stock: 25,
        popularity: 92
    },
    {
        name: "Oversized Denim Shorts",
        description: "Relaxed fit denim shorts with rolled hem. Perfect summer essential.",
        price: 62.00,
        category: CATEGORIES.DENIM,
        brand: "Denim House",
        color: "Light Blue",
        size: "24/26/28/30/32",
        images: [
            "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1582552938357-32b906253bd5?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "denim, shorts, oversized, summer, casual",
        stock: 50,
        popularity: 88
    },
    {
        name: "Chunky Platform Boots - Black",
        description: "Edgy platform combat boots with chunky sole. Perfect streetwear statement.",
        price: 125.00,
        category: CATEGORIES.STREETWEAR,
        brand: "Urban Collective",
        color: "Black",
        size: "6/7/8/9/10",
        images: [
            "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1560343076-ec3408845037?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "streetwear, platform boots, chunky, combat, edgy",
        stock: 32,
        popularity: 93
    },
    {
        name: "Tie-Dye Crop Sweatshirt",
        description: "Trendy tie-dye cropped sweatshirt in pastel colors. Soft and cozy.",
        price: 48.00,
        category: CATEGORIES.Y2K,
        brand: "Retro Revival",
        color: "Pastel Multi",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1578262825743-a4e30c4cafa5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "Y2K, tie-dye, crop, sweatshirt, pastel",
        stock: 48,
        popularity: 89
    },
    {
        name: "Satin Midi Skirt - Slip Style",
        description: "Elegant satin midi skirt with bias cut. Versatile and sophisticated.",
        price: 78.00,
        category: CATEGORIES.MINIMALIST,
        brand: "Essentials Co",
        color: "Champagne",
        size: "XS/S/M/L",
        images: [
            "https://images.unsplash.com/photo-1583407723287-8ef9a0d8d23d?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "minimalist, satin, midi skirt, slip, elegant",
        stock: 38,
        popularity: 90
    },
    {
        name: "Varsity Jacket - Vintage Style",
        description: "Classic varsity jacket with chenille patches. Retro sporty vibes.",
        price: 145.00,
        category: CATEGORIES.OUTERWEAR,
        brand: "Urban Edge",
        color: "Black/White",
        size: "S/M/L/XL",
        images: [
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1548624149-f9b1859aa2d0?auto=format&fit=crop&w=600&q=80"
        ],
        tags: "outerwear, varsity jacket, vintage, sporty, retro",
        stock: 28,
        popularity: 91
    }
];

async function seedGenzFashion() {
    try {
        console.log('🌱 Starting GenZ Fashion Seed...');

        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connected to MongoDB');

        // Find or create admin user
        let admin = await User.findOne({ email: 'admin@stylee.com' });

        if (!admin) {
            console.log('Creating admin user...');
            admin = await User.create({
                name: 'Admin User',
                email: 'admin@stylee.com',
                password: 'adminpassword123', // In production use bcrypt
                role: 'ADMIN'
            });
        }
        console.log(`✅ Using admin: ${admin.email} (ID: ${admin._id})`);

        // Clear existing items
        console.log('🗑️  Clearing existing items...');
        await Item.deleteMany({});
        console.log('✅ Cleared existing items');

        // Insert GenZ products
        console.log(`📦 Adding ${genzProducts.length} GenZ fashion products...`);

        const productsToInsert = genzProducts.map(product => ({
            ...product,
            createdBy: admin._id
        }));

        const result = await Item.insertMany(productsToInsert);
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

        console.log('\n✨ GenZ Fashion seed completed successfully!');
        console.log(`\n🎉 Total products in database: ${result.length}`);

    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        console.log('\n👋 Database connection closed');
        process.exit(0);
    }
}

// Run the seed
seedGenzFashion();
