import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import productRoutes from "./routes/routes.product.js";
import authRoutes from "./routes/routes.auth.js";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors());
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
      auth: "/api/auth",
    },
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});
app.get("/api/saleshorse/:id", async (req, res) => {
  res.send("This is the product page of the product you clicked");
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Visit: http://localhost:${PORT}`);
});
