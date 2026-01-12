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