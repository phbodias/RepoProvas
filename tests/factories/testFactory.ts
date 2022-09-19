import { faker } from "@faker-js/faker";

export async function testFactory() {
  return {
    name: faker.random.words(3),
    pdfUrl: faker.internet.url(),
    category: "Prática",
    discipline: "JavaScript",
    teacher: "Diego Pinho",
  };
}

export async function invalidTestFactory() {
  return {
    name: faker.random.words(3),
    pdfUrl: faker.internet.url(),
    category: "Prática",
    discipline: "JavaScript",
    teacher: "Bruna Hamori",
  };
}

