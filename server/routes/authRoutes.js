import express from "express";
import { signup, login, logout } from "../controllers/authcontroller.js";
const routes = express.Router();


routes.post("/login", login);

routes.post("/signup", signup);

routes.post("/logout", logout);

export default routes;
