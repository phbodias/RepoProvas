import { Router } from "express";
import {
  getTestsByDiscsController,
  getTestsByTeacherController,
  insertTestController,
} from "../controllers/testController";
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
testRoute.get("/testByTeacher", getTestsByTeacherController);

export default testRoute;
