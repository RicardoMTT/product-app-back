import express from "express";
import { save } from "../controllers/order.controller";
const router = express.Router();

router.post("/", save);

export default router;
