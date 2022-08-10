import express from "express";
import { login } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/login", login.init);

export default userRouter;
