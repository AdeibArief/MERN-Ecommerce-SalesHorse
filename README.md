# 🛍️ SalesHorse - MERN E-commerce Platform

A full-stack e-commerce application built with MongoDB, Express, React, and Node.js.

![SalesHorse Homepage](./screenshot.png)

## ✨ Features

- 🛒 Product catalog with category filtering
- 📱 Responsive design for all devices
- 🎨 Dark/Light theme toggle
- 🛍️ Shopping cart with persistent storage
- 💳 Checkout process
- ⭐ Product ratings and reviews display

## 🚀 Live Demo

- **Frontend:** [Coming Soon]
- **Backend API:** [Coming Soon]

## 🛠️ Tech Stack

**Frontend:**
- React 18
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