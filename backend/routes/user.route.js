import express from "express";
import { createUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.delete("/", deleteUser);

export default router;
