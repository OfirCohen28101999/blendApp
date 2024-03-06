import request from "supertest";
import { app } from "./auth.test";

describe("Track tests", () => {
  test("Test GetAllTracks", async () => {
    const response = await request(app).get("/api/tracks");
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });
});
