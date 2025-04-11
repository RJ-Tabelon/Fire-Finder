import mongoose from "mongoose";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all required fields."});
    }

    const { name } = req.body;

    const check_user = await User.findOne({ name });
    if(check_user){
        return res.status(404).json({ success: false, message: "Username already exists."});
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser})
    } catch (error) {
        console.error("Error in creating user:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ succcess: false, message: "User not found"});
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "User deleted"});
    } catch (error) {
        console.log("Error in deleting product:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users});
    } catch (error) { 
        console.log("Error in fetching products:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ succcess: false, message: "User not found"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({ success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const loginUser = async (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials." });
    }
  
    try {
      const user = await User.findOne({ name });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "Invalid credentials." });
      }
  
      res.status(200).json({ success: true, message: "Login successful", data: user });
    } catch (error) {
      console.error("Login error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };
  