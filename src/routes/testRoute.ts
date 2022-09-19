import { Router } from "express";
import { getTestsByDiscsController, insertTestController } from "../controllers/testController";
import { validateJWT } from "../middlewares/tokenMiddleware";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware";
import { testSchema } from "../schemas/testSchema";

const testRoute = Router();

testRoute.use(validateJWT);
testRoute.post(
  "/test",
  validateSchemaMiddleware(testSchema),
  insertTestController
);
testRoute.get("/testByDiscs", getTestsByDiscsController);

export default testRoute;
