import express from "express";
import { loginController, registerController } from "../controller/User.js";

const app = express.Router();

app.post("/register", registerController);
app.post("/login", loginController);

export default app;
