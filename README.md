# 🛍️ SalesHorse - MERN E-commerce Platform

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

## SalesHorse Homepage

<img width="1913" height="846" alt="image" src="https://github.com/user-attachments/assets/269696d5-a81e-46ca-90f5-59f665ce5d4e" />


## ✨ Features

- 🛒 Product catalog with category filtering
- 📱 Responsive design for all devices
- 🎨 Dark/Light theme toggle
- 🛍️ Shopping cart with persistent storage
- 💳 Checkout process
- ⭐ Product ratings and reviews display

## 🚀 Live Demo

![Demo]("https://mern-ecommerce-sales-horse.vercel.app/")

## 🛠️ Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Tailwind CSS
- DaisyUI
- Axios
- React Hot Toast
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI:
```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
```

5. Seed the database:
```bash
npm run seed
```

6. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5001`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm start
```

Frontend will run on `http://localhost:3000`

## 📁 Project Structure

saleshorse/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── products.js
│   ├── seed.js
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
└── README.md



## 🌐 API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 🚀 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on Render
3. Connect GitHub repository
4. Add environment variables
5. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables
4. Deploy

## 🔮 Upcoming Features

- [ ] User authentication (login/register)
- [ ] Payment integration (Stripe)
- [ ] Order history
- [ ] Admin dashboard
- [ ] Product search
- [ ] User reviews
- [ ] Wishlist
- [ ] Email notifications

## 👨‍💻 Author

**Adeib Arief**
- GitHub: [@AdeibArief](https://github.com/AdeibArief)

## 📄 License

This project is open source and available under the MIT License.

##  Acknowledgments

- DaisyUI for the beautiful UI components
- Unsplash for product images
- MongoDB Atlas for database hosting
