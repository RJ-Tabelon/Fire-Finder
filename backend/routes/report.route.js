import express from "express";
import { createReport, deleteReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReport);
// router.get("/", getUsers);
router.delete("/:id", deleteReport);
// router.put("/:id", updateUser);

export default router;
