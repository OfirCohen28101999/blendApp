import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import userModel from "../models/user.model";
import redisClient from "../utils/connect-to-redis";

let app: Express;

const user = {
  name: "test user",
  email: "testUser@test.com",
  password: "1234567890",
  passwordConfirm: "1234567890",
};

beforeAll(async () => {
  app = await initApp();
  await userModel.deleteMany({ email: user.email });
});

afterAll(async () => {
  await userModel.deleteMany({ email: user.email });
  await mongoose.connection.close();
  await redisClient.quit();
});

describe("Auth tests", () => {
  test("Test Register", async () => {
    const response = await request(app).post("/api/auth/register").send(user);
    expect(response.statusCode).toBe(201);
  });

  //   test("Test Register exist email", async () => {
  //     const response = await request(app).post("/auth/register").send(user);
  //     expect(response.statusCode).toBe(406);
  //   });

  //   test("Test Register missing password", async () => {
  //     const response = await request(app).post("/auth/register").send({
  //       email: "test@test.com",
  //     });
  //     expect(response.statusCode).toBe(400);
  //   });

  //   test("Test Login", async () => {
  //     const response = await request(app).post("/auth/login").send(user);
  //     expect(response.statusCode).toBe(200);
  //     accessToken = response.body.accessToken;
  //     expect(accessToken).toBeDefined();
  //   });

  //   test("Test forbidden access without token", async () => {
  //     const response = await request(app).get("/student");
  //     expect(response.statusCode).toBe(401);
  //   });

  //   test("Test access with valid token", async () => {
  //     const response = await request(app)
  //       .get("/student")
  //       .set("Authorization", "JWT " + accessToken);
  //     expect(response.statusCode).toBe(200);
  //   });

  //   test("Test access with invalid token", async () => {
  //     const response = await request(app)
  //       .get("/student")
  //       .set("Authorization", "JWT 1" + accessToken);
  //     expect(response.statusCode).toBe(401);
  //   });
});
