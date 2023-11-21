import * as z from "zod"

export const UserValidation = z.object({
  profilePhoto: z.string().url().min(1),
  name: z.string().min(3).max(30),
  username: z.string().min(6).max(15),
  bio: z.string().min(3).max(100).optional(),
  link: z.string().min(3).max(500).optional(),
})
/* 
    "https://files.edgestore.dev/3zgmkhgty15vn9ga/publicFiles/_public/aa6eed17-f167-4f48-9eac-3883ec6bd6d1.png",
*/
