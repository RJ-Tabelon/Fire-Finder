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

export const deleteReport = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ succcess: false, message: "INVALID ID"});
    }

    const existingReport = await Report.findById(id);

    if (!existingReport) {
        return res.status(404).json({ succcess: false, message: "REPORT NOT FOUND"});
    }

    try {
        await Report.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "REPORT DELETED"});
    } catch (error) {
        console.log("ERROR IN DELETING REPORT:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const getReports = async (req, res) => {
    try {
        const reports = await Report.find({});
        res.status(200).json({ success: true, data: reports});
    } catch (error) { 
        console.log("ERROR IN FETCHING REPORTS:", error.message);
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};

export const updateReport = async (req, res) => {
    const { id } = req.params;

    const report = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ succcess: false, message: "INVALID ID"});
    }

    const existingReport = await Report.findById(id);

    if (!existingReport) {
        return res.status(404).json({ succcess: false, message: "REPORT NOT FOUND"});
    }

    try {
        const updatedReport = await Report.findByIdAndUpdate(id, report, {new: true});
        res.status(200).json({ success: true, data: updatedReport});
    } catch (error) {
        res.status(500).json({ success: false, message: "SERVER ERROR"});
    }
};