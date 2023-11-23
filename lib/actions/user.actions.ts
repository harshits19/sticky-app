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
  userLabel?: string
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
    throw new Error(`${error}`)
  }
}
export const getUser = async (userId: string) => {
  try {
    connectToDB()
    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
export const getUserByAuthorId = async (authorId: string) => {
  try {
    connectToDB()
    return await User.findOne({ _id: authorId })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
