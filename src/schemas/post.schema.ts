import { object, string, TypeOf } from "zod";

export const upsertPostSchema = object({
  body: object({
    trackId: string({ required_error: "Track id is required" }),
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }),
    photo: string(),
  }),
});

const params = {
  params: object({
    postId: string(),
  }),
};

export const getPostSchema = object({
  ...params,
});

export const deletePostSchema = object({
  ...params,
});

export type UpsertPostInput = TypeOf<typeof upsertPostSchema>["body"];
export type GetPostInput = TypeOf<typeof getPostSchema>["params"];
export type DeletePostInput = TypeOf<typeof deletePostSchema>["params"];
