import * as authRepository from "../repositories/authRepository";
import { registerData, userData } from "../types/authTypes";
import { conflictError } from "../utils/errorUtils";
import bcrypt from "bcrypt";

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
