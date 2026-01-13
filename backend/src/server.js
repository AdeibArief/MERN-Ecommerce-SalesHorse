import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/routes.product.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

// CORS Configuration - Allow your Vercel frontend
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173", // Vite dev server
  "https://mern-ecommerce-sales-horse-fq0dklmti-adeibariefs-projects.vercel.app", // Your Vercel URL
  "https://mern-ecommerce-sales-horse.vercel.app", // Production URL (if different)
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        console.log("Blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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
