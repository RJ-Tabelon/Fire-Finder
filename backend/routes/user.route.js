import express from "express";
import { createUser, deleteUser, getUsers, updateUser, loginUser, updateLocation} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/", createUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/location", updateLocation);
router.put("/:id", updateUser);

export default router;
