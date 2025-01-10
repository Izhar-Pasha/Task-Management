import bcrypt from "bcrypt";
// import { user } from "../models/modelSchema.js";
import user from "../models/userModel.js";
import mongoose from "mongoose";
import Project from "../models/projectModel.js";
import { authorization } from "./authController.js";

// CREATE NEW USER
export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const existingUser = await user.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new user({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "New user successfully added!" });
  } catch (error) {
    console.error("Failed to create new user", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

// GET USER DETAILS
export const getUser = async (req, res) => {
  try {
    // const { id } = req.params;
    // const user = authorization.id;
    const User = req.user?.id;
    console.log("just checkin:", User);

    if (!mongoose.Types.ObjectId.isValid(User)) {
      return res.status(400).json({ message: "Invalid user ID!" });
    }

    const userDetails = await user.findById(User).populate({
      path: "project",
      populate: {
        path: "tasks",
      },
    });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ userDetails });
  } catch (error) {
    console.error("Failed to get user details", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the user." });
  }
};

// UPDATE THE USER
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!id || !name || !email || !password) {
      return res
        .status(400)
        .json({ message: "ID and at least one field to update are required!" });
    }

    const updatedUser = await user.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res
      .status(200)
      .json({ user: updatedUser, message: "User successfully updated!" });
  } catch (error) {
    console.error("Failed to update user details", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the user." });
  }
};

// DELETE THE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const deletedUser = await user.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    res
      .status(200)
      .json({ user: deletedUser, message: "User deleted successfully!" });
  } catch (error) {
    console.error("Failed to delete user details", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
