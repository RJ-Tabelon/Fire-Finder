import mongoose from "mongoose";
import Report from "../models/Report.js";

export const createReport = async (req, res) => {
    const report = req.body;

    if (!report.fireName || !report.latitude || !report.longitude || !report.source) {
        return res.status(400).json({ success: false, message: "PLEASE PROVIDE ALL REQUIRED FIELDS !"});
    }
  
    const newReport = new Report(report);

    try {
        await newReport.save();
        res.status(201).json({ success: true, data: newReport})
    } catch (error) {
        console.error("ERROR IN CREATING REPORT:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

// export const deleteUser = async (req, res) => {
//     const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ succcess: false, message: "USER NOT FOUND"});
//     }

//     try {
//         await User.findByIdAndDelete(id);
//         res.status(200).json({ success: true, message: "USER DELETED"});
//     } catch (error) {
//         console.log("ERROR IN DELETING PRODUCT:", error.message);
//         res.status(500).json({ success: false, message: "SERVER ERROR"});
//     }
// };

// export const getUsers = async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.status(200).json({ success: true, data: users});
//     } catch (error) { 
//         console.log("ERROR IN FETCHING PRODUCTS:", error.message);
//         res.status(500).json({ success: false, message: "SERVER ERROR"});
//     }
// };

// export const updateUser = async (req, res) => {
//     const { id } = req.params;

//     const user = req.body;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ succcess: false, message: "USER NOT FOUND"});
//     }

//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});
//         res.status(200).json({ success: true, data: updatedUser});
//     } catch (error) {
//         res.status(500).json({ success: false, message: "SERVER ERROR"});
//     }
// };

// export const loginUser = async (req, res) => {
//     const { name, password } = req.body;
  
//     if (!name || !password) {
//       return res.status(400).json({ success: false, message: "MISSING CREDENTIALS ❌" });
//     }
  
//     try {
//       const user = await User.findOne({ name });
  
//       if (!user || user.password !== password) {
//         return res.status(401).json({ success: false, message: "INAVLID CREDENTIALS ❌" });
//       }
  
//       res.status(200).json({ success: true, message: "LOGIN SUCCESSFUL", data: user });
//     } catch (error) {
//       console.error("LOGIN ERROR:", error.message);
//       res.status(500).json({ success: false, message: "SERVER ERROR" });
//     }
//   };
  