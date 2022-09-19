import { Router } from "express";
import { insertTestController } from "../controllers/testController";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRoute = Router();

testRoute.post(
  "/test",
  validateSchemaMiddleware(testSchema),
  validateJWT,
  insertTestController
);

export default testRoute;
