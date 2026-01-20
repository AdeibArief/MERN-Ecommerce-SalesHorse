import express from "express";
import { protect } from "../middleware/middleware.authMiddleware.js";
import {
  cancelOrder,
  getOrderById,
  myOrders,
  orders,
} from "../controllers/OrderController.js";

const router = express.Router();

router.post("/", protect, orders);

router.get("/myorders", protect, myOrders);

router.get("/:id", protect, getOrderById);

router.put("/:id/cancel".protect, cancelOrder);

export default router;
