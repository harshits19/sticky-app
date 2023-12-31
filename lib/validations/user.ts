import * as z from "zod"

export const UserValidation = z.object({
  profilePhoto: z.string().url().min(1),
  name: z.string().min(3).max(30),
  username: z.string().min(6).max(15),
  bio: z.string().max(200).optional(),
  link: z.string().max(200).optional(),
  userLabel: z.string().max(50).optional(),
  visibility: z.string().optional(),
})
/* 
    "https://files.edgestore.dev/3zgmkhgty15vn9ga/publicFiles/_public/aa6eed17-f167-4f48-9eac-3883ec6bd6d1.png",
*/
