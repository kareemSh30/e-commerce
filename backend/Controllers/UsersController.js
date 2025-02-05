import User from "../Models/Users.js";
import expressAsyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";

import genrateToken from "../Utils/jwtAuth.js";

export const CreateUsers = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = genrateToken(res, newUser._id);

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const LoginUsers = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = genrateToken(res, user._id);

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("Login Controller Error:", error);
  }
});

export const logoutUsers = expressAsyncHandler(async (req, res) => {

  res.clearCookie("token", { httpOnly: true });
  res.status(200).json({ message: "Logout successful" });
});

export const updateUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new Error("User not found");
    }

    const { name, email } = req.body;

    if (!name && !email) {
      throw new Error("Please provide either name or email to update.");
    }

    const updatedFields = {};
    if (name) updatedFields.name = name;
    if (email) updatedFields.email = email;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedFields },
      { new: true, runValidators: true }
    );

    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    if (!userId) {
      throw new Error("User not found");
    }

    await User.findByIdAndDelete(userId);
    res.json({ message: "User deleted successfully." });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

