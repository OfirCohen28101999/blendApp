import request from "supertest";
import initApp from "../app";
import mongoose from "mongoose";
import { Express } from "express";
import userModel from "../models/user.model";

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
});

describe("Auth tests", () => {
  test("Test Register", async () => {
    const response = await request(app).post("/api/auth/register").send(user);
    expect(response.statusCode).toBe(201);
  });

  test("Test Register exist email", async () => {
    const response = await request(app).post("/api/auth/register").send(user);
    console.log("response: " + JSON.stringify(response));
    expect(response.statusCode).toBe(409);
  });

  test("Test Register missing parameters", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: user.email });
    console.log("response: " + JSON.stringify(response));

    expect(response.statusCode).toBe(400);
  });

  let accessToken: string;

  test("Test Login", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));

    accessToken = response.body.accessToken;
    expect(accessToken).toBeDefined();
  });

  test("Test forbidden access without token", async () => {
    const response = await request(app).get("/api/users/me");
    console.log("response: " + JSON.stringify(response));

    expect(response.statusCode).toBe(401);
  });

  test("Test access with valid token", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test access with invalid token", async () => {
    const response = await request(app)
      .get("/api/users/me")
      .set("Authorization", "Bearer typo" + accessToken);
    expect(response.statusCode).toBe(401);
  });

  test("Test forbidden access with valid token but no role permissions", async () => {
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer " + accessToken);
    console.log("response: " + JSON.stringify(response));

    expect(response.statusCode).toBe(403);
  });

  test("Test forbidden access with valid token & valid role permissions", async () => {
    await userModel.findOneAndUpdate({ email: user.email }, { role: "admin" });
    const response = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer " + accessToken);
    console.log("response: " + JSON.stringify(response));

    expect(response.statusCode).toBe(200);
  });
});
