import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller.js";


// POST: http://localhost:5000/api/v1/auth/signup
router.post("/signup", authController.signUp);
// GET: http://localhost:5000/api/v1/auth/verify/:token
router.get("/verify/:token",authController.verifyEmail)


// router.post("/signin", authController.singIn);


export default router;