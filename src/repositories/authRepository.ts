import { db } from "../dbStrategy/db";
import { userData } from "../types/authTypes";

export async function register(data: userData) {
  return await db.user.create({ data });
}

export async function findByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}

export async function resetToken(
  email: string,
  ResetToken: string,
  expireDateToken: string
) {
  return await db.user.update({
    where: { email },
    data: {
      resetPassToken: ResetToken,
      expireDateToken,
    },
  });
}

export async function resetPassword(email: string, newPassword: string) {
  return await db.user.update({
    where: { email },
    data: {
      password: newPassword,
    },
  });
}

export async function createTwoFactorAuth(email: string, secret: string) {
  return await db.user.update({
    where: { email },
    data: { secret },
  });
}
