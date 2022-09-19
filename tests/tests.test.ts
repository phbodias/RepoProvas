import supertest from "supertest";
import app from "../src/index";
import { invalidTestFactory, testFactory } from "./factories/testFactory";
import prisma from "../src/database/database";
import { createValidToken } from "./utils/createToken";

beforeEach(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Users";`;
  await prisma.$executeRaw`TRUNCATE TABLE "Tests"`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe("Testing POST /test", () => {
  it("Insert a new test and return status code 201", async () => {
    const token = await createValidToken();
    const body = await testFactory();
    const result = await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(201);
    expect(result.body.createdAt.length).toBeGreaterThan(0);
  });

  it("Try to insert a repeat pdfUrl and return status code 409", async () => {
    const token = await createValidToken();
    const body = await testFactory();
    await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    const result = await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(409);
  });

  it("Try to insert a test with a teacher does not teach that discipline and return status code 409", async () => {
    const token = await createValidToken();
    const body = await invalidTestFactory();
    const result = await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(409);
  });

  it("Try to insert a test with invalid body return status code 422", async () => {
    const token = await createValidToken();
    const body = await testFactory();
    body.category = "any invalid category";
    const result = await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(422);
  });

  it("Try to insert a test without a token and return status code 401", async () => {
    const body = await testFactory();
    const result = await supertest(app).post("/test").send(body);
    expect(result.status).toBe(401);
  });

  it("Try to insert a test with a invalid token and return status code 401", async () => {
    const token = createValidToken() + "a";
    const body = await testFactory();
    const result = await supertest(app)
      .post("/test")
      .send(body)
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(401);
  });
});

describe("Testing GET /testByDiscs", () => {
  it("Getting tests by disciplines and return status code 200 and a array with tests", async () => {
    const token = await createValidToken();
    const newTest = await testFactory();
    await supertest(app)
      .post("/test")
      .send(newTest)
      .set("Authorization", `Bearer ${token}`);
    const result = await supertest(app)
      .get("/testByDiscs")
      .set("Authorization", `Bearer ${token}`);
    expect(result.status).toBe(200);
  });

  it("Try get tests by disciplines without a valid token and return status code 401", async () => {
    const token = await createValidToken();
    const newTest = await testFactory();
    await supertest(app)
      .post("/test")
      .send(newTest)
      .set("Authorization", `Bearer ${token}`);
    const result = await supertest(app)
      .get("/testByDiscs")
      .set("Authorization", `Bearer ${token}aaaa`);
    expect(result.status).toBe(401);
  });
});
