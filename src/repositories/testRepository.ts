import { Terms } from "@prisma/client";
import prisma from "../database/database";
import { ITestData, TTestData } from "../types/testTypes";

export async function insert(testData: TTestData) {
  const test: ITestData = await prisma.tests.create({ data: testData });
  return test;
}

export async function findByPdfUrl(pdfUrl: string) {
  const test: ITestData = await prisma.tests.findUnique({ where: { pdfUrl } });
  return test;
}

export async function getTestsForDisciplines(): Promise<Terms[]> {
  return prisma.terms.findMany({
    include: {
      disciplines: {
        orderBy: { termId: "asc" },
        include: {
          teachersDisciplines: {
            select: {
              tests: {
                distinct: ["categoryId"],
                select: {
                  categories: {
                    select: {
                      id: true,
                      name: true,
                      tests: {
                        select: {
                          name: true,
                          pdfUrl: true,
                          teachersDisciplines: {
                            select: {
                              teachers: {
                                select: {
                                  name: true,
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
}
