import { db } from "../dbStrategy/db";
import { userData } from "../types/authTypes";

export async function register(data: userData) {
  return await db.user.create({ data });
}

export async function findByEmail(email: string) {
  return await db.user.findUnique({ where: { email } });
}
