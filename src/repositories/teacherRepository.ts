import prisma from "../database/database";
import { ITeacherData } from "../types/teacherTypes";

export async function findByName(name: string) {
  const teacher = await prisma.teachers.findUnique({ where: { name } });
  return teacher as ITeacherData;
}
