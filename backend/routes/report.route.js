import express from "express";
import { createReport, deleteReport, getReports } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReport);
router.get("/", getReports);
router.delete("/:id", deleteReport);
// router.put("/:id", updateUser);

export default router;
