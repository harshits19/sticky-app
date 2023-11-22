import * as z from "zod"

export const ThreadValidation = z.object({
  authorId: z.string().optional(),
  content: z.string().min(3, { message: "Minimum 3 characters." }),
  postImg: z.array(z.string()).optional(),
  parentId: z.string().optional(),
  updated: z.date().optional(),
})

/* export const CommentValidation = z.object({
  thread: z.string().min(3, { message: "Minimum 3 characters." }),
}) */
