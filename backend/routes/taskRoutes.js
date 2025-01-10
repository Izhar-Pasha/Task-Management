import express from "express";
import {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controller/taskController.js";
import { authorization } from "../controller/authController.js";

const router = express.Router();

router.post("/Task", authorization, createTask);
router.get("/allTask", authorization, getAllTasks);
router.get("/:id", authorization, getTask);
router.put("/:id", authorization, updateTask);
router.delete("/:id", authorization, deleteTask);

export default router;
