import * as authRepository from "../repositories/authRepository";
import { registerData, userData } from "../types/authTypes";
import { conflictError } from "../utils/errorUtils";

async function existUser(email: string) {
  const userData = await authRepository.findByEmail(email);
  if (userData) throw conflictError("Conflito, verifique os dados");
  return userData;
}

export async function register(data: userData) {
  const userData = await existUser(data.email);
  await authRepository.register(data);
}
