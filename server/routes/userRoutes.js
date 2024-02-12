import express from "express";
import protectRoutes from "../middleware/protectRoutes.js";
import { getUsersForSideBar } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/', protectRoutes, getUsersForSideBar);

export default userRoutes;
