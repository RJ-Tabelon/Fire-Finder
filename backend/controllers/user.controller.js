import mongoose from "mongoose";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const user = req.body;

    if (!user.name || !user.password) {
        return res.status(400).json({ success: false, message: "Please provide all fields."});
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
