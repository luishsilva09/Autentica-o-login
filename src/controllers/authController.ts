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

export async function forgetPassword(req: Request, res: Response) {
  const email = req.body.email;
  await authService.forgetPassword(email);

  res.status(200).send("Verifique seu email");
}

export async function resetPassword(req: Request, res: Response) {
  const passwordToken = req.params.resetToken;
  const { email, newPassword } = req.body;
  await authService.resetPassword(email, passwordToken, newPassword);
  res.status(200).send("Senha atualizada");
}
