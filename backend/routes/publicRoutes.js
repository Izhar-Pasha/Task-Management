import { registration, login } from "../controller/authController.js";
import express from "express";

const router = express.Router();

router.post("/registration", registration);
router.post("/login", login);

export default router;
