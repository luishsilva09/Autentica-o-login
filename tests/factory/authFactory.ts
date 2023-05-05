import { faker } from "@faker-js/faker";

export async function registerData() {
  const password = faker.internet.password();
  return {
    email: faker.internet.email(),
    password: password,
    repeatPassword: password,
  };
}
