import express from "express";
import { createClient, getClients } from "../controllers/client.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createClient); 
router.get("/", protectRoute, getClients);     

export default router;
