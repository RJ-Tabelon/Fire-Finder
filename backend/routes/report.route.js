import express from "express";
import { createReport, deleteReport, getReports, updateReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", getReports);
router.delete("/:id", deleteReport);
router.put("/:id", updateReport);

export default router;
