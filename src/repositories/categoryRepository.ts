import prisma from "../database/database";
import { ICategoryData } from "../types/categoryTypes";

export async function findByName(name: string) {
  const categorie = await prisma.categories.findUnique({ where: { name } });
  return categorie as ICategoryData;
}
