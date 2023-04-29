import { Router } from "express";
import * as authController from "../controllers/authController";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware";
import { forgetPassword, newUser, userLogin } from "../schemas/authSchemas";

const authRoutes = Router();

authRoutes.post("/register", schemaValidate(newUser), authController.register);
authRoutes.post("/login", schemaValidate(userLogin), authController.login);
authRoutes.post(
  "/forgetPassword",
  schemaValidate(forgetPassword),
  authController.forgetPassword
);
authRoutes.post("/resetPassword");

export default authRoutes;
