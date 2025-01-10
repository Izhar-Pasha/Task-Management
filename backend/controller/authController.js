import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { user } from "../models/modelSchema.js";
import user from "../models/userModel.js";
import crypto from "crypto";

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill all the required fields!" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const User = new user({ name, email, password: hashedpassword });

    await User.save();

    res.status(201).json({ message: "Registration Successful!", User });
  } catch (error) {
    console.error("Unable to register:", error);
    res
      .status(500)
      .json({ message: "An error occurred while creating the user." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const validUser = await user.findOne({ email });
    if (!validUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    const isPasswordMatch = await bcrypt.compare(password, validUser.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    const payload = {
      id: validUser._id,
      email: validUser.email,
    };
    console.log("just checking the credential", payload);

    const secret = "123456789";
    const options = { expiresIn: "1h" };

    const token = jwt.sign(payload, secret, options);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Unable to login:", error);
    res.status(500).json({ message: "An error occurred while logging in." });
  }
};

export const authorization = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    // console.log("All Request Headers:", req.headers);

    if (!token) {
      return res.status(401).json({ message: "Token is missing!" });
    }

    const secret = "123456789";

    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Unable to verify auth:", error);
    res.status(401).json({ message: "Invalid or expired token!" });
  }
};
