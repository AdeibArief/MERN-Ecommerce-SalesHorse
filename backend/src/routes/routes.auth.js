import express from "express";
import User from "../models/model.user.js";
import { protect } from "../middleware/middleware.authMiddleware.js";
import { getUserDetails, LoginUser, RegisterUser, updateDetails } from "../controllers/UserAuthController.js";

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login",LoginUser);

router.get("/me",protect,getUserDetails);

router.put("/updateprofile",protect, updateDetails);

export default router;