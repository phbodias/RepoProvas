import Joi from "joi";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
  confirmPassword: Joi.ref("password"),
});

const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).required(),
});

export {registerSchema, signinSchema};
