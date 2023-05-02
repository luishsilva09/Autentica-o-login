import { db } from "../../src/dbStrategy/db";
import supertest from "supertest";
import app from "../../src/app";

beforeEach(async () => {
  await db.$queryRaw`TRUNCATE TABLE users`;
});

afterAll(() => {
  db.$disconnect();
});

describe("Integration test for auth service", () => {
  test("Register", async () => {
    const dataTest = {
      email: "teste@teste.com",
      password: "123",
      repeatPassword: "123",
    };
    const request = await supertest(app).post("/register").send(dataTest);
    expect(request.status).toBe(201);
  });
  test.todo("Login");
  test.todo("forget password");
  test.todo("Reset password");
});
