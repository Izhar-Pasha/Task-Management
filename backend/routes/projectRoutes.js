import express from "express";
import {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";
import { authorization } from "../controller/authController.js";

const router = express.Router();

router.post("/Projects", authorization, createProject);
router.get("/allProjects", authorization, getAllProjects);
router.get("/Projects/", getProject);
router.put("/Projects/:id", authorization, updateProject);
router.delete("/:id", authorization, deleteProject);

export default router;
