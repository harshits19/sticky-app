"use server"
import { connectToDB } from "@/lib/mongoose"
import Thread from "../models/thread.model"
import User from "../models/user.model"
import { revalidatePath } from "next/cache"

interface threadProps {
  authorId: string
  content: string
  postImg?: string[]
  path: string
}
export const createThread = async ({
  authorId,
  content,
  postImg,
  path,
}: threadProps): Promise<void> => {
  try {
    connectToDB()
    const createdThread = await Thread.create({
      authorId,
      text: content,
      postImages: postImg,
    })
    await User.findByIdAndUpdate(authorId, {
      $push: { userPosts: createdThread._id },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
export const getAllPosts = async (pageNumber = 1, pageSize = 20) => {
  try {
    connectToDB()
    const skipAmount = (pageNumber - 1) * pageSize
    const postsQuery = Thread.find({ parentId: { $in: [null, undefined] } })
      .sort({ created: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({
        path: "authorId",
        model: User,
        select: "_id name username profilePhoto",
      })
      .populate({
        path: "children",
        populate: {
          path: "authorId",
          model: User,
          select: "_id name parentId profilePhoto",
        },
      })

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    })

    const posts = await postsQuery.exec()

    const isNext = totalPostsCount > skipAmount + posts.length
    return { posts, isNext }
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
export const getPostsByAuthorId = async (authorId: string) => {
  try {
    connectToDB()
    return await Thread.findById({ authorId })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
