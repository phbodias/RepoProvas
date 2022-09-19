import prisma from "../database/database";
import { IDisciplineData } from "../types/disciplineTypes";

export async function findByName(name: string) {
  const discipline = await prisma.disciplines.findUnique({ where: { name } });
  return discipline as IDisciplineData;
}
