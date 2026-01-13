import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './src/models/models.product.js';
import connectDB from './src/config/db.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-cancelling wireless headphones with 30-hour battery life and superior sound quality',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'electronics',
    stock: 50,
    rating: 4.5,
    numReviews: 128
  },
  {
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and water resistance',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'electronics',
    stock: 30,
    rating: 4.7,
    numReviews: 89
  },
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Ultra-soft 100% organic cotton t-shirt with modern fit and breathable fabric',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'clothing',
    stock: 100,
    rating: 4.3,
    numReviews: 245
  },
  {
    name: 'Running Shoes Elite',
    description: 'Professional running shoes with responsive cushioning and durable outsole',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'sports',
    stock: 45,
    rating: 4.6,
    numReviews: 176
  },
  {
    name: 'Yoga Mat Premium',
    description: 'Eco-friendly non-slip yoga mat with extra cushioning and carrying strap',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    category: 'sports',
    stock: 60,
    rating: 4.4,
    numReviews: 92
  },
  {
    name: 'Laptop Backpack Deluxe',
    description: 'Water-resistant backpack with padded laptop compartment and USB charging port',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'accessories',
    stock: 35,
    rating: 4.5,
    numReviews: 67
  },
  {
    name: 'Wireless Mouse Gaming',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    category: 'electronics',
    stock: 75,
    rating: 4.4,
    numReviews: 143
  },
  {
    name: 'Desk Lamp LED',
    description: 'Adjustable LED desk lamp with touch control and multiple brightness levels',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    category: 'home',
    stock: 55,
    rating: 4.2,
    numReviews: 81
  },
    // -------------------- MORE PRODUCTS --------------------

  {
    name: "Bluetooth Speaker Boom",
    description:
      "Portable Bluetooth speaker with deep bass, 12-hour battery life, and splash resistance",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1512446816042-444d641267d4?w=500",
    category: "electronics",
    stock: 65,
    rating: 4.4,
    numReviews: 210,
  },
  {
    name: "Mechanical Keyboard RGB",
    description:
      "Tactile mechanical keyboard with customizable RGB lighting and durable key switches",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500",
    category: "electronics",
    stock: 40,
    rating: 4.6,
    numReviews: 155,
  },
  {
    name: "USB-C Fast Charger 65W",
    description:
      "65W fast charger with USB-C Power Delivery for phones, tablets, and laptops",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330c56?w=500",
    category: "electronics",
    stock: 150,
    rating: 4.5,
    numReviews: 480,
  },
  {
    name: "Noise Cancelling Earbuds Mini",
    description:
      "Compact true wireless earbuds with ANC, low latency mode, and charging case",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=500",
    category: "electronics",
    stock: 85,
    rating: 4.3,
    numReviews: 199,
  },
  {
    name: "4K Action Camera",
    description:
      "4K waterproof action camera with stabilization and wide-angle lens for adventures",
    price: 109.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500",
    category: "electronics",
    stock: 28,
    rating: 4.2,
    numReviews: 74,
  },

  {
    name: "Hoodie Streetwear Classic",
    description:
      "Soft fleece hoodie with modern streetwear fit and durable stitching",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1520975958225-43a01f084a0b?w=500",
    category: "clothing",
    stock: 90,
    rating: 4.5,
    numReviews: 300,
  },
  {
    name: "Denim Jacket Vintage",
    description:
      "Stylish vintage denim jacket with button closure and comfortable layering fit",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=500",
    category: "clothing",
    stock: 40,
    rating: 4.4,
    numReviews: 121,
  },
  {
    name: "Athletic Shorts Dry-Fit",
    description:
      "Lightweight athletic shorts with moisture-wicking fabric for training and gym",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1593032457866-e5552c95a4f4?w=500",
    category: "clothing",
    stock: 130,
    rating: 4.3,
    numReviews: 215,
  },
  {
    name: "Sneakers Everyday Comfort",
    description:
      "Everyday sneakers with breathable material and cushioned sole for all-day wear",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    category: "clothing",
    stock: 55,
    rating: 4.2,
    numReviews: 98,
  },

  {
    name: "Gym Dumbbell Set (2x5kg)",
    description:
      "Durable dumbbell set for home workouts with easy-grip handles",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1599058917212-d750089bc07d?w=500",
    category: "sports",
    stock: 70,
    rating: 4.6,
    numReviews: 160,
  },
  {
    name: "Resistance Bands Kit",
    description:
      "Full resistance band kit with multiple strengths for strength training and rehab",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1599058918144-1ffabb6ab9a0?w=500",
    category: "sports",
    stock: 120,
    rating: 4.4,
    numReviews: 260,
  },
  {
    name: "Protein Shaker Bottle",
    description:
      "Leak-proof shaker bottle with mixing ball, perfect for protein shakes and smoothies",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500",
    category: "sports",
    stock: 200,
    rating: 4.2,
    numReviews: 410,
  },
  {
    name: "Skipping Rope Speed Pro",
    description:
      "High-speed skipping rope with adjustable length and smooth bearings",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=500",
    category: "sports",
    stock: 140,
    rating: 4.3,
    numReviews: 185,
  },

  {
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated stainless water bottle keeps drinks cold for 24h and hot for 12h",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1526401485004-2aa6d61b05b3?w=500",
    category: "accessories",
    stock: 110,
    rating: 4.6,
    numReviews: 340,
  },
  {
    name: "Leather Wallet Slim",
    description:
      "Minimal slim leather wallet with RFID protection and premium finish",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",
    category: "accessories",
    stock: 95,
    rating: 4.4,
    numReviews: 150,
  },
  {
    name: "Sunglasses Polarized",
    description:
      "Polarized UV-protection sunglasses with lightweight frame and modern design",
    price: 16.99,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",
    category: "accessories",
    stock: 75,
    rating: 4.3,
    numReviews: 108,
  },
  {
    name: "Travel Organizer Pouch",
    description:
      "Compact organizer pouch for cables, charger, power bank, and accessories",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1520975682031-a69f6fd4b1bd?w=500",
    category: "accessories",
    stock: 90,
    rating: 4.5,
    numReviews: 84,
  },

  {
    name: "Aroma Diffuser Mini",
    description:
      "Essential oil aroma diffuser with silent mist and ambient light modes",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1616628182502-2b0b6a9d8bca?w=500",
    category: "home",
    stock: 60,
    rating: 4.4,
    numReviews: 133,
  },
  {
    name: "Non-Stick Cookware Pan",
    description:
      "Premium non-stick cookware pan for easy cooking with heat-resistant handle",
    price: 27.99,
    image: "https://images.unsplash.com/photo-1588167056547-75b8e797b0b4?w=500",
    category: "home",
    stock: 50,
    rating: 4.3,
    numReviews: 76,
  },
  {
    name: "Ceramic Coffee Mug Set",
    description:
      "Set of 2 premium ceramic mugs with comfortable grip and stylish finish",
    price: 15.99,
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500",
    category: "home",
    stock: 80,
    rating: 4.5,
    numReviews: 98,
  },
  {
    name: "Memory Foam Pillow",
    description:
      "Ergonomic memory foam pillow for neck support and better sleep posture",
    price: 31.99,
    image: "https://images.unsplash.com/photo-1582582494700-55f84b1ac8fd?w=500",
    category: "home",
    stock: 45,
    rating: 4.6,
    numReviews: 115,
  },

  {
    name: "Atomic Habits (Paperback)",
    description:
      "A proven framework for building good habits and breaking bad ones by James Clear",
    price: 11.99,
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500",
    category: "books",
    stock: 120,
    rating: 4.8,
    numReviews: 3200,
  },
  {
    name: "The Psychology of Money",
    description:
      "Timeless lessons on wealth, greed, and happiness by Morgan Housel",
    price: 10.99,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=500",
    category: "books",
    stock: 95,
    rating: 4.7,
    numReviews: 1900,
  },
  {
    name: "Deep Work",
    description:
      "Rules for focused success in a distracted world by Cal Newport",
    price: 9.99,
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500",
    category: "books",
    stock: 88,
    rating: 4.6,
    numReviews: 1500,
  },
  {
    name: "The Lean Startup",
    description:
      "How today's entrepreneurs use continuous innovation to create successful businesses",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500",
    category: "books",
    stock: 70,
    rating: 4.5,
    numReviews: 1100,
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Delete all existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} sample products added!`);
    
    console.log('\n📦 Products in database:');
    createdProducts.forEach(product => {
      console.log(`   - ${product.name} ($${product.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();