import * as authRepository from "../repositories/authRepository";
import { registerData, userData } from "../types/authTypes";
import { conflictError } from "../utils/errorUtils";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

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
