import request from "supertest";
import { Express } from "express";
import mongoose from "mongoose";
import initApp from "../app";

export let app: Express;

beforeAll(async () => {
  app = await initApp();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Track tests", () => {
  test("Test GetAllTracks", async () => {
    const response = await request(app).get("/api/tracks");
    expect(response.statusCode).toBe(200);
  });
});
