import express from "express";
import Product from "../models/models.product.js";
import {
  getAllProducts,
  categoryWiseProducts,
  createProduct,
  deleteProduct,
  getSpecificProduct,
  updateProduct,
} from "../controllers/ProductsController.js";
const router = express.Router();

router.get("/", getAllProducts);

router.get("/:id", getSpecificProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.get("/category/:category", categoryWiseProducts);

export default router;
