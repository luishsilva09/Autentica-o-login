import { Router } from "express";
import * as authController from "../controllers/authController";
import { schemaValidate } from "../middlewares/schemaValidateMiddleware";
import { newUser } from "../schemas/authSchemas";

const authRoutes = Router();

authRoutes.post("/register", schemaValidate(newUser), authController.register);
authRoutes.post("/login");
authRoutes.post("/forgetPassword");
authRoutes.post("/resetPassword");

export default authRoutes;
