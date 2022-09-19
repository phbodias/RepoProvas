import { Request, Response } from "express";
import { Terms } from "@prisma/client";
import { ITestBody, ITestData } from "../types/testTypes";
import * as testServices from "../services/testsServices";

export async function insertTestController(req: Request, res: Response) {
  const testBody: ITestBody = req.body;
  const newTest: ITestData = await testServices.insert(testBody);
  return res.status(201).send(newTest);
}

export async function getTestsByDiscsController(req: Request, res: Response) {
  const tests: Terms[] = await testServices.getTestsByDiscipline();
  return res.status(200).send(tests);
}
