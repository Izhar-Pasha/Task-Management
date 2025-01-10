import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/UserController.js";
import { authorization } from "../controller/authController.js";

const router = express.Router();

router.post("/registration", authorization, createUser);
router.get("/userDetail", authorization, getUser);
router.put("/:id", authorization, updateUser);
router.delete("/:id", authorization, deleteUser);

export default router;
