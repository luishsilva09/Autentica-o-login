import joi from "joi";
export const newUser = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
  repeatPassword: joi.string().trim().valid(joi.ref("password")).required(),
});

export const userLogin = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().required(),
});
