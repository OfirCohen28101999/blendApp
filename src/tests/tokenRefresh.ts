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
  process.env.ACCESS_TOKEN_EXPIRATION = "3";
  process.env.REFRESH_TOKEN_EXPIRATION = "15";
  app = await initApp();
  await userModel.deleteMany({ email: user.email });
});

afterAll(async () => {
  const userFound = await userModel.findOne({ email: user.email });
  if (userFound) {
    await redisClient.del(userFound.id);
  }
  await userModel.deleteMany({ email: user.email });
  await mongoose.connection.close();
  await redisClient.quit();
});

describe("refresh token tests", () => {
  let accessToken: string;

  test("Test User session has expired functionality", async () => {
    await request(app).post("/api/auth/register").send(user);
    const responseFromLogin = await request(app).post("/api/auth/login").send({
      email: user.email,
      password: user.password,
    });

    console.log(
      "response from login with bearer: " + JSON.stringify(responseFromLogin)
    );

    accessToken = responseFromLogin.body.accessToken;

    const responseFromSomeQuery = await request(app)
      .get("/api/users")
      .set("Authorization", "Bearer " + accessToken);
    console.log("response: " + JSON.stringify(responseFromSomeQuery));

    expect(responseFromSomeQuery.statusCode).toBe(401);
  });

  //   test("Test User with that token no longer exist functionality", async () => {
  //     await userModel.findOneAndUpdate({ email: user.email }, { role: "admin" });
  //     const response = await request(app)
  //       .get("/api/users")
  //       .set("Authorization", "Bearer " + accessToken);
  //     console.log("response: " + JSON.stringify(response));

  //     expect(response.statusCode).toBe(401);
  //   });
});
