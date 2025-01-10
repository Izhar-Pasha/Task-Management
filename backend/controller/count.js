import Task from "../models/taskModel.js";
import Project from "../models/projectModel.js";

const getCount = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments({});
    const taskCount = await Task.countDocuments({});

    res.status(200).send({
      count: {
        Project: projectCount,
        Task: taskCount,
      },
    });
  } catch (error) {
    console.log(
      "Failed to get count:",
      error.response?.messgae || error.message
    );
    throw error;
  }
};

export default getCount;
