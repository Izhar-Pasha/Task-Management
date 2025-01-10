import Project from "../models/projectModel.js";
import mongoose from "mongoose";
import User from "../models/userModel.js";

// CREATE NEW USER
// export const createProject = async (req, res) => {
//   try {
//     const { name, description, tasks } = req.body;
//     const ownerid = req.user.id;

//     if (!name || !description) {
//       return res.status(400).json({ message: "All fields are required!" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(ownerid)) {
//       return res.status(400).json({ message: "Invalid owner ID" });
//     }

//     const project = new Project({
//       name,
//       description,
//       owner: ownerid,
//       tasks: Array.isArray(tasks) ? tasks : [], // Ensure tasks is an array
//     });
//     if (!project) return console.log("checking", project);
//     await project.save();
//     // console.log("checking", project);

//     res.status(200).json({ message: "New project successfully added!" });
//   } catch (error) {
//     console.error("Failed to create new project", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while creating the project." });
//   }
// };
export const createProject = async (req, res) => {
  try {
    const { name, description, tasks } = req.body;
    const ownerid = req.user.id; // Assuming the user ID is stored in req.user

    // Validate the input
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and description are required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(ownerid)) {
      return res.status(400).json({ message: "Invalid owner ID" });
    }

    const project = new Project({
      name,
      description,
      owner: ownerid,
      tasks: Array.isArray(tasks) ? tasks : [],
    });

    await project.save();

    await User.findByIdAndUpdate(ownerid, {
      $push: { projects: project._id },
    });

    res.status(200).json({ message: "New project successfully added!" });
  } catch (error) {
    console.error("Failed to create new project", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the project." });
  }
};

//GET ALL THE PROJECT
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner");
    res.status(200).json(projects);
  } catch (error) {
    console.log("Unable to get the projects", error);
    res
      .status(500)
      .json({ message: "An error occurred while Getting the project." });
  }
};

//GET SINGLE PROJECTS
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID!" });
    }

    const project = await Project.findById(id)
      .populate("owner")
      .populate("tasks");

    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    res.status(200).json(project);
  } catch (error) {
    console.log("Unable to get the projects", error);
    res
      .status(500)
      .json({ message: "An error occurred while Getting the project." });
  }
};

//UPDATE THE PROJECT
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description)
      return res.status(400).json({ message: "All fields are required!" });

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID!" });
    }

    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "Request body cannot be empty!" });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    res.status(200).json(project);
  } catch (error) {
    console.log("Unable to update the projects", error);
    res
      .status(500)
      .json({ message: "An error occurred while Updating the project." });
  }
};

//DELETE THE PROJECT

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid project ID!" });
    }

    const project = await Project.findByIdAndDelete(id);

    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    res.status(200).json(project);
  } catch (error) {
    console.log("Unable to deleting the project", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the project." });
  }
};
