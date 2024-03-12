import request from "supertest";
import { Express } from "express";
import mongoose from "mongoose";
import initApp from "../app";

export let app: Express;
export let accessToken: string;

export const user = {
  email: "test1@gmail.com",
  password: "123456www"
};

export const post = {
    title: "New post title",
    description: "Imagine this is a long post description",
    trackId: "0QDGzInNYjTlYI28Xq7slK",
    image: "something.png"
};

export const updatedPost = {
    title: "Updated post title",
    description: "Imagine this is a long post description",
    trackId: "0QDGzInNYjTlYI28Xq7slK",
    image: "something.png"
};

export const comment = {
    title: "comment title",
    description: "comment description"
}

export const updatedComment = {
    title: "updated comment title",
    description: "updated comment description"
}

beforeAll(async () => {
  app = await initApp();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Post tests", () => {
    test("Test Login", async () => {
        const response = await request(app).post("/api/auth/login").send({
            email: user.email,
            password: user.password,
        });
        expect(response.statusCode).toBe(200);

        accessToken = response.body.accessToken;
        expect(accessToken).toBeDefined();
    });

  test("Test DeletePostImage Fail", async () => { 
    const response = await request(app)
    .delete("/api/post/image/delete/default.png")
    .set("Authorization", "Bearer " + accessToken);
  expect(response.statusCode).toBe(500);
  });

  test("Test GetAllPosts", async () => {
    const response = await request(app).get("/api/post").set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  let newPostId: string;

  test("Test CreatePost", async () => {
    const response = await request(app).post("/api/post").send(post).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(201);
    newPostId = response.body.data.post._id;
    expect(newPostId).toBeDefined();
  });

  test("Test CreatePost missing parameters", async () => {
    const response = await request(app).post("/api/post").send({ title: post.title }).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(400);
  });

  test("Test GetPostById", async () => {
    const response = await request(app).get(`/api/post/${newPostId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test GetPostById wrong url", async () => {
    const response = await request(app).get("/api/post/${newPostId}").set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
  });

  test("Test UpdatePostById", async () => {
    const response = await request(app).patch(`/api/post/${newPostId}`).send(updatedPost).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  let newCommentId: string;

  test("Test CreateCommentByPostId", async () => {
    const response = await request(app).post(`/api/post/comment/${newPostId}`).send(comment).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(201);
    newCommentId = response.body.data.comment._id;
    expect(newCommentId).toBeDefined();
  });

  test("Test CreateCommentByPostId missing parameters", async () => {
    const response = await request(app).post(`/api/post/comment/${newPostId}`).send({description: comment.description}).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
  });

  test("Test UpdateCommentByCommentId", async () => {
    const response = await request(app).patch(`/api/post/comment/${newCommentId}`).send(updatedComment).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test GetAllCommentsByPostId", async () => {
    const response = await request(app).get(`/api/post/${newPostId}/comments`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
  });

  test("Test DeleteCommentByCommentId", async () => {
    const response = await request(app).delete(`/api/post/comment/${newCommentId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
  });

  test("Test DeletePostById", async () => {
    const response = await request(app).delete(`/api/post/${newPostId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
  })
});
