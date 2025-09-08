import express from "express";
import activtyController from "../controllers/activity.controller";

const router = express.Router();

router.post("/",activtyController.createActivity);
router.get("/", activtyController.getAll);
router.get("/search", activtyController.search);
router.get("/:id", activtyController.getById);
router.put("/:id",activtyController.update);
router.delete("/:id", activtyController.delete);

export default router;