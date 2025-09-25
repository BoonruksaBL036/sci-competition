import express from "express";
import activtyController from "../controllers/activity.controller.js";
import authJwt from "../middleware/authJwt.js";

const router = express.Router();
const { verifyToken, isAdmin, isTeacher, isJudge } = authJwt;


router.post("/", verifyToken, isAdmin, activtyController.createActivity);
router.get("/", verifyToken, activtyController.getAll);
router.get("/search", verifyToken, activtyController.search);
router.get("/:id", verifyToken, activtyController.getById);
router.put("/:id", verifyToken, isAdmin, activtyController.update);
router.delete("/:id", verifyToken, isAdmin,activtyController.delete);

export default router;
