"use server"
import { connectToDB } from "@/lib/mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"

interface threadProps {
  authorId: string
  content: string
  postImg?: string[]
  path: string
  parentId?: string
}
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
  visibility?: string
}

export const getAllActivities = async (pageNumber = 1, pageSize = 20) => {
  try {
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
