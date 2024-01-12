import { object, string, TypeOf } from "zod";

export const upsertPostSchema = object({
  body: object({
    trackId: string({ required_error: "Track id is required" }),
    title: string({ required_error: "Title is required" }),
    description: string({ required_error: "Description is required" }),
    photo: string(),
  }),
});

export type UpsertPostInput = TypeOf<typeof upsertPostSchema>["body"];
