import request from "supertest";
import { accessToken, app } from "./auth.test";

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

describe("Post tests", () => {
  test("Test GetAllPosts", async () => {
    const response = await request(app).get("/api/post").set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });

  let newPostId: string;

  test("Test CreatePost", async () => {
    const response = await request(app).post("/api/post").send(post).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(201);
    newPostId = response.body.data.post._id;
    expect(newPostId).toBeDefined();
    console.log("response: " + JSON.stringify(response));
  });


  test("Test CreatePost missing parameters", async () => {
    const response = await request(app).post("/api/post").send({ title: post.title }).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(400);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test GetPostById", async () => {
    const response = await request(app).get(`/api/post/${newPostId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test GetPostById wrong url", async () => {
    const response = await request(app).get("/api/post/${newPostId}").set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test UpdatePostById", async () => {
    const response = await request(app).patch(`/api/post/${newPostId}`).send(updatedPost).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });

  let newCommentId: string;

  test("Test CreateCommentByPostId", async () => {
    const response = await request(app).post(`/api/post/comment/${newPostId}`).send(comment).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(201);
    newCommentId = response.body.data.comment._id;
    expect(newCommentId).toBeDefined();
    console.log("response: " + JSON.stringify(response));
  });

  test("Test CreateCommentByPostId missing parameters", async () => {
    const response = await request(app).post(`/api/post/comment/${newPostId}`).send({description: comment.description}).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(500);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test UpdateCommentByCommentId", async () => {
    const response = await request(app).patch(`/api/post/comment/${newCommentId}`).send(updatedComment).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test GetAllCommentsByPostId", async () => {
    const response = await request(app).get(`/api/post/${newPostId}/comments`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(200);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test DeleteCommentByCommentId", async () => {
    const response = await request(app).delete(`/api/post/comment/${newCommentId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
    console.log("response: " + JSON.stringify(response));
  });

  test("Test DeletePostById", async () => {
    const response = await request(app).delete(`/api/post/${newPostId}`).set("Authorization", "Bearer " + accessToken);
    expect(response.statusCode).toBe(204);
    console.log("response: " + JSON.stringify(response));
  })

});
