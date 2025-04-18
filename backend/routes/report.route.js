import express from "express";
import { createReport } from "../controllers/report.controller.js";

const router = express.Router();

router.post("/", createReport);
// router.get("/", getUsers);
// router.delete("/:id", deleteUser);
// router.put("/:id", updateUser);

export default router;
