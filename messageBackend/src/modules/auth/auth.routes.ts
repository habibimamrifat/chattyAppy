import express from "express";
import authController from "./auth.controller";
import validator from "../../../src/util/validator";
import { logInValidator } from "./auth.validatot";

import auth from "../../middleWare/auth";

const authRouter = express.Router();

authRouter.post("/logIn", validator(logInValidator), authController.logIn);
authRouter.get(
  "/logOut",
  auth(),
  authController.logOut
);

export default authRouter;