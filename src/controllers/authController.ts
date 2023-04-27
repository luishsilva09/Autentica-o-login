import { Request, Response } from "express";
import * as authService from "../services/authService";
import { registerData } from "../types/authTypes";

export async function register(req: Request, res: Response) {
  const data: registerData = req.body;
  await authService.register({ email: data.email, password: data.password });
  res.status(201).send("Criado com sucesso");
}

export async function login(req: Request, res: Response) {
  const token = await authService.login(req.body);
  res.status(200).send({ token });
}
