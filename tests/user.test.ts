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
    expect(result.body.createdAt.length).toBeGreaterThan(0);
  });

  it("Tries to insert user with email already registered in the database and receives status 409", async () => {
    const body = await userFactory();
    await supertest(app).post("/signup").send(body);
    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toBe(409);
  });

  it("Tries to insert user without a valid email and receives status 422", async () => {
    const body = {
      email: "agoogle.com",
      password: "aaaaaaaaaaaaaa",
      confirmPassword: "aaaaaaaaaaaaaa",
    };

    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toBe(422);
  });

  it("Tries to insert user without password and receives status 422", async () => {
    const body = {
      email: "a@gmail.com",
      password: "",
      confirmPassword: "",
    };

    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toBe(422);
  });

  it("Tries to insert user with confirmPassword different than password and receives status 422", async () => {
    const body = {
      email: "a@gmail.com",
      password: "aaaaaaaaaaaaaa",
      confirmPassword: "bbbbbbbbbbbb",
    };

    const result = await supertest(app).post("/signup").send(body);
    expect(result.status).toBe(422);
  });
});
