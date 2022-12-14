import { Terms } from "@prisma/client";
import { ITestBody } from "../types/testTypes";
import * as categoryRepository from "../repositories/categoryRepository";
import * as disciplinesRepository from "../repositories/disciplinesRepository";
import * as teacherRepository from "../repositories/teacherRepository";
import * as teachersDisciplinesRepository from "../repositories/teachersDisciplinesRepository";
import * as testRepository from "../repositories/testRepository";
import { ITeacherDisciplineData } from "../types/teacherDisciplineTypes";

export async function insert(testBody: ITestBody) {
  const pdfUrlNotAvailable = await testRepository.findByPdfUrl(testBody.pdfUrl);
  if (pdfUrlNotAvailable)
    throw { code: "Conflict", message: "This pdfUrl already registered" };
  const categoryId: number = (
    await categoryRepository.findByName(testBody.category)
  ).id;
  const disciplineId: number = (
    await disciplinesRepository.findByName(testBody.discipline)
  ).id;
  const teacherId: number = (
    await teacherRepository.findByName(testBody.teacher)
  ).id;
  const teacherDiscipline: ITeacherDisciplineData =
    await teachersDisciplinesRepository.findByIds(teacherId, disciplineId);
  if (!teacherDiscipline) {
    throw {
      code: "Conflict",
      message: "This teacher does not give this discipline",
    };
  }
  const teacherDisciplineId: number = teacherDiscipline.id;
  const testData = {
    name: testBody.name,
    pdfUrl: testBody.pdfUrl,
    categoryId,
    teacherDisciplineId,
  };
  return await testRepository.insert(testData);
}

export async function getTestsByDiscipline() {
  const tests : Terms[] = await testRepository.getTestsForDisciplines();

  return tests;
}

export async function getTestsByTeacher() {
  const tests = await testRepository.getTestsForTeachers();

  return tests;
}