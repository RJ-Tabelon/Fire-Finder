import mongoose from "mongoose";
import User from "../models/User.js";

export const createUser = async (req, res) => {
    const user = {
        ...req.body,
        name: req.body.name.trim(),
        // .toLowerCase().trim(), 
      };

    if (!user.name || !user.password) {
        return res.status(400).json({ success: false, message: "PLEASE PROVIDE ALL REQUIRED FIELDS !"});
    }

    const existingUser = await User.findOne({ name: user.name });

    if (existingUser) {
    return res.status(400).json({ success: false, message: "USERNAME ALREADY EXISTS !" });
    }
  
    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json({ success: true, data: newUser})
    } catch (error) {
        console.error("ERROR IN CREATING USER:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "USER NOT FOUND"});
    }

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "USER DELETED"});
    } catch (error) {
        console.log("ERROR IN DELETING PRODUCT:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users});
    } catch (error) { 
        console.log("ERROR IN FETCHING PRODUCTS:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "USER NOT FOUND"});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
        res.status(200).json({ success: true, data: updatedUser});
    } catch (error) {
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const loginUser = async (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(400).json({ success: false, message: "MISSING CREDENTIALS !" });
    }
  
    try {
      const user = await User.findOne({ name }).lean();
  
      if (!user || user.password !== password) {
        return res.status(401).json({ success: false, message: "INAVLID CREDENTIALS !" });
      }
  
      res.status(200).json({ success: true, message: "LOGIN SUCCESSFUL", data: user });
    } catch (error) {
      console.error("LOGIN ERROR:", error.message);
      res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
  };

  // TO DO: Fix bug that prevents success or failure message from appearing in frontend
  // TO DO: Fix security issue that results in passed-in username being used rather than unique profile ID
  export const updateLocation = async (req, res) => {
    try {
      // const rawName = req.body.name;
      // const name = rawName?.trim();
      const name = req.body.name;
      //.toLowerCase(); 
      const lat = parseFloat(req.body.lat);
      const lng = parseFloat(req.body.lng);
  
      if (!name || isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ success: false, message: "INVALID LOCATION INPUT" });
      }
      
      // Find the user first
      const user = await User.findOne({ name });
      //({ name: name });
      
      if (!user) {
        return res.status(404).json({ success: false, message: "USER NOT FOUND" });
      }
      
      // Set the location directly and save
      user.location = { lat, lng };
      await user.save();
      
      res.status(200).json({ success: true, message: "LOCATION UPDATED", data: user });
    } catch (error) {
      console.error("UPDATE LOCATION ERROR:", error.message, error.stack);
      res.status(500).json({ success: false, message: "SERVER ERROR" });
    }
  };
  
  
  