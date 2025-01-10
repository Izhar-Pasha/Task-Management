import getCount from "../controller/count.js";
import express from "express";
import { authorization } from "../controller/authController.js";
const router = express.Router();

router.get("/dashboard", authorization, getCount);

export default router;
