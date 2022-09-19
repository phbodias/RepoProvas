import prisma from "../database/database";
import { ITeacherDisciplineData } from "../types/teacherDisciplineTypes";

export async function findByIds(teacherId: number, disciplineId: number) {
  const result = await prisma.teachersDisciplines.findFirst({
    where: {
      AND: [{ teacherId }, { disciplineId }],
    },
  });
  return result as ITeacherDisciplineData;
}
