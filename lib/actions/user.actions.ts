"use server"
import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/models/user.model"
import { revalidatePath } from "next/cache"
interface userProps {
  userId: string
  path: string
  name?: string
  username?: string
  profilePhoto?: string
  bio?: string
  link?: string
  onboarded?: string
  userLabel?: boolean
  visibility?: boolean
}
export const updateUser = async ({
  userId,
  name,
  username,
  profilePhoto,
  bio,
  link,
  userLabel,
  visibility,
  path,
}: userProps): Promise<void> => {
  try {
    connectToDB()
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username?.toLowerCase(),
        onboarded: true,
        name,
        bio,
        profilePhoto,
        link,
        userLabel,
        visibility,
      },
      { upsert: true },
    )
    if (path === "/profile/edit") revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error.message}`)
  }
}
