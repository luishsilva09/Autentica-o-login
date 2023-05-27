import * as authRepository from "../repositories/authRepository";
import { registerData, userData } from "../types/authTypes";
import { conflictError, unauthorizedError } from "../utils/errorUtils";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";

dotenv.config();

async function findUser(email: string) {
  return await authRepository.findByEmail(email);
}

export async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function register(data: userData) {
  const userData = await findUser(data.email);
  if (userData) throw conflictError("Conflito verifique os dados");

  const cryptPass = await encryptPassword(data.password);
  const registerData = { ...data, password: cryptPass };

  await authRepository.register(registerData);
}

export async function login(data: userData) {
  const userData = await findUser(data.email);
  if (!userData) throw conflictError("Conflito verifique os dados");

  const comparePassword = await bcrypt.compare(
    data.password,
    userData.password
  );
  if (!comparePassword) throw conflictError();

  return JWT.sign({ email: userData.email }, process.env.SECRET_JWT || "");
}

export async function forgetPassword(email: string) {
  const userData = await findUser(email);
  if (!userData) throw conflictError("Conflito verifique os dados");
  const date = new Date();
  const resetToken = uuid();
  const expireDateToken = date.setTime(date.getTime() + 2 * 60 * 60 * 1000);

  await authRepository.resetToken(
    email,
    resetToken,
    expireDateToken.toString()
  );

  //send mail
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: `${process.env.EMAIL}`,
      pass: `${process.env.PASSWORD_EMAIL}`,
    },
  });
  const info = await transport.sendMail({
    from: '"Autentica" ',
    to: `${userData.email}`,
    subject: "Redefinir senha",
    text: `Para redefinir senha utilize esse token: ${process.env.URL_FRONT}/${resetToken}`,
  });
}

export async function resetPassword(
  email: string,
  resetToken: string,
  newPassword: string
) {
  const userData = await findUser(email);
  const date = new Date();

  if (!userData) throw conflictError("Conflito verifique os dados");

  if (userData.resetPassToken !== resetToken)
    throw unauthorizedError("Não autorizado");
  if (date.getTime() > Number(userData.expireDateToken))
    throw unauthorizedError("Token expirado");

  const cryptPass = await encryptPassword(newPassword);

  await authRepository.resetPassword(email, cryptPass);
}

export async function enableTwoFactorAuth(email: string) {
  const userData = await findUser(email);

  if (!userData || userData.twoFactorAuth)
    throw conflictError("Conflito verifique os dados");

  const secret = speakeasy.generateSecret();

  await authRepository.createTwoFactorAuth(email, secret.base32);

  return secret;
}

export async function validToken(token: string, email: string) {
  const userData = await findUser(email);

  if (!userData || userData.secret === null)
    throw conflictError("Conflito verifique os dados");

  const validate = speakeasy.totp.verify({
    secret: userData.secret,
    encoding: "base32",
    token,
  });

  if (validate && userData.twoFactorAuth === false)
    await authRepository.enableTwoFactorAuth(email);

  if (validate) {
    return { code: 200, message: "ativado com sucesso" };
  }
  return { code: 401, message: "Conflito" };
}
