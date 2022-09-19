import prisma from "../database/database";
import { ITestData, TTestData } from "../types/testTypes";

export async function insert(testData: TTestData) {
  const test : ITestData = await prisma.tests.create({ data: testData })
  return test;
}

export async function findByPdfUrl(pdfUrl: string) {
  const test : ITestData = await prisma.tests.findUnique({ where: { pdfUrl } });
  return test;
}
