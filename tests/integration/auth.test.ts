import { db } from "../../src/dbStrategy/db";
import supertest from "supertest";
import app from "../../src/app";
import * as authFactory from "../factory/authFactory";

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users`;
});

afterAll(() => {
  db.$disconnect();
});

describe("Integration test for auth service", () => {
  test("Register", async () => {
    const dataTest = await authFactory.registerData();
    const request = await supertest(app).post("/register").send(dataTest);
    const confirmRegister = await db.user.findUnique({
      where: { email: dataTest.email },
    });
    expect(request.status).toBe(201);
    expect(confirmRegister).not.toBe(null);
  });
  test.todo("Login");
  test.todo("forget password");
  test.todo("Reset password");
});
