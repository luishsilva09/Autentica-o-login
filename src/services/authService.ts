import * as authRepository from "../repositories/authRepository";
import { registerData, userData } from "../types/authTypes";
import { conflictError } from "../utils/errorUtils";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { v4 as uuid } from "uuid";
import nodemailer from "nodemailer";

dotenv.config();

async function findUser(email: string) {
  return await authRepository.findByEmail(email);
}

export async function register(data: userData) {
  const userData = await findUser(data.email);
  if (userData) throw conflictError("Conflito verifique os dados");

  const cryptPass = bcrypt.hashSync(data.password, 10);
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
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "86aea034c3c2f4",
      pass: "8df22a4d404dc4",
    },
  });
  const info = await transport.sendMail({
    from: '"Autentica" ',
    to: "luishsilva09@gmail.com",
    subject: "Redefinir senha",
    text: `${resetToken}`,
  });
}
