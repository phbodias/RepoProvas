import { Router } from "express";
import { validateSchemaMiddleware } from '../middlewares/validateSchemaMiddleware';
import { signInController, signUpController } from "../controllers/authController";
import { registerSchema, signinSchema } from '../schemas/authSchema'

const authRoute = Router();

authRoute.post('/signup', validateSchemaMiddleware(registerSchema), signUpController);
authRoute.post('/signin', validateSchemaMiddleware(signinSchema), signInController);

export default authRoute;