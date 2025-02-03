import express from "express";
import authController from "./auth.controller";
import auth from "../../middleWare/auth";

const authRouter = express.Router();

authRouter.post("/logIn", authController.logIn);
authRouter.get(
  "/logOut",
  auth("user"),
  authController.logOut
);

export default authRouter;