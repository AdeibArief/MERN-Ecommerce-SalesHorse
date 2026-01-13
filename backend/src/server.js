import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/routes.product.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();


// CORS Configuration for Production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://mern-ecommerce-sales-horse.vercel.app/' // Update this later
    : 'http://localhost:5173',
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to SalesHorse API",
    version: "1.0.0",
    endpoints: {
      products: "/api/products",
      singleProduct: "/api/products/:id",
    },
  });
});

app.use("/api/products", productRoutes);

app.get("/api/saleshorse/:id", async (req, res) => {
  res.send("This is the product page of the product you clicked");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
});
