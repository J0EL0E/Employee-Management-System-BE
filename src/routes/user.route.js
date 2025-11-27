import {Router} from "express";
import { registerUser,
    loginUser, 
    forgotPassword, 
    refreshTokenController,
    logOutController 
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.post("/user/forgot-password", forgotPassword);
userRouter.post("/user/refresh", refreshTokenController);
userRouter.post("/user/logout", logOutController);


