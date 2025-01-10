import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";
import mongoose from "mongoose";

//CREATE TASK
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, project } = req.body;

    if (!title || !description || !project)
      return res
        .status(400)
        .json({ message: "Please fill the required fields" });

    const existingProject = await Project.findById(project);
    if (!existingProject)
      return res.status(404).json({ message: "Project not found!" });

    const task = new Task({ title, description, status, priority, project });
    await task.save();

    res.status(201).json({ message: "Task Created Successfully", task });
  } catch (error) {
    console.error("Unable to create task", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the task." });
  }
};

//GET ALL TASKS
export const getAllTasks = async (req, res) => {
  try {
    const allTasks = await Task.find().populate("project");
    res.status(200).json(allTasks);
  } catch (error) {
    console.error("Unable to get all tasks", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting all tasks." });
  }
};

//GET SINGLE TASK
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID!" });
    }

    const task = await Task.findById(id).populate("project");
    if (!task) return res.status(404).json({ message: "Task not found!" });

    res.status(200).json(task);
  } catch (error) {
    console.error("Unable to get task", error);
    res.status(500).json({ message: "An error occurred while getting task." });
  }
};

//UPDATE TASK
export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid task ID!" });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "Request body cannot be empty!" });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found!" });

    res.status(200).json({ message: "Task has been updated", task });
  } catch (error) {
    console.error("Unable to update task", error);
    res.status(500).json({ message: "An error occurred while updating task." });
  }
};

//DELETE TASK
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid task ID!" });

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found!" });

    res.status(200).json({ message: "Task has been deleted", task });
  } catch (error) {
    console.error("Unable to delete task", error);
    res.status(500).json({ message: "An error occurred while deleting task." });
  }
};
