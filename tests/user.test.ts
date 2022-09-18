import supertest from "supertest";
import app from "../src/index";
import userFactory from "./factories/userFactory";
import prisma from "../src/database/database";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testing POST /signup", () => {
  it("Insert a new user and return status code 201", async () => {
    const body = await userFactory();
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toBe(201);
  });
});
