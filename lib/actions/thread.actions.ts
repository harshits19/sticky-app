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
  parentId?: string
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
      parentId: null,
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
          select: "_id name username parentId profilePhoto",
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
export const getPostsByAuthorId = async (authorId: any) => {
  try {
    connectToDB()
    const posts = await Thread.find({
      authorId,
      parentId: { $in: [null, undefined] },
    })
      .sort({ created: "desc" })
      .populate({
        path: "authorId",
        model: User,
        select: "_id name username profilePhoto",
      })
      .populate({
        path: "children",
        model: Thread,
      })
    const replies = await Thread.find({
      authorId,
      parentId: { $exists: true, $ne: null },
    })
      .sort({ created: "desc" })
      .populate({
        path: "authorId",
        model: User,
        select: "_id name username profilePhoto",
      })
      .populate({
        path: "parentId",
        model: Thread,
        populate: {
          path: "authorId",
          model: User,
          select: "_id name username profilePhoto",
        },
      })
      .populate({
        path: "children",
        model: Thread,
      })
    const reposts = await User.findOne({
      _id: authorId,
    })
      .select("reposts")
      .sort({ created: "desc" })
      .populate({
        path: "reposts",
        model: Thread,
        populate: {
          path: "authorId",
          model: User,
          select: "_id name username profilePhoto",
        },
      })
    return { posts, replies, reposts }
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const getThreadById = async (threadId: string) => {
  try {
    connectToDB()
    return await Thread.findById({ _id: threadId })
      .populate({
        path: "authorId",
        model: User,
        select: "_id name username profilePhoto",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "authorId",
            model: User,
            select: "_id id name username parentId profilePhoto",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "authorId",
              model: User,
              select: "_id id name username parentId profilePhoto",
            },
          },
        ],
      })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
export const createComment = async ({
  authorId,
  parentId,
  content,
  postImg,
  path,
}: threadProps): Promise<void> => {
  try {
    connectToDB()
    const createdComment = await Thread.create({
      authorId,
      parentId,
      text: content,
      postImages: postImg,
    })

    await Thread.findByIdAndUpdate(parentId, {
      $push: { children: createdComment._id },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const likePost = async ({
  userId,
  threadId,
  path,
}: {
  userId: string
  threadId: string
  path: string
}) => {
  try {
    connectToDB()
    await Thread.findByIdAndUpdate(threadId, {
      $push: { likes: userId },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const dislikePost = async ({
  userId,
  threadId,
  path,
}: {
  userId: string
  threadId: string
  path: string
}) => {
  try {
    connectToDB()
    const currThread = await Thread.findById(threadId)
    const allLikes = currThread.likes.filter(
      (author: string) => author !== userId,
    )
    await Thread.findByIdAndUpdate(threadId, {
      likes: allLikes,
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const getFollowersByAuthor = async ({
  authorId,
}: {
  authorId: string
}) => {
  try {
    connectToDB()
    return await User.findOne({ _id: authorId })
      .populate({
        path: "followers",
        model: User,
        select: "_id name username profilePhoto bio followers",
      })
      .populate({
        path: "followings",
        model: User,
        select: "_id name username profilePhoto bio followers",
      })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const repost = async ({
  userId,
  threadId,
  path,
}: {
  userId: string
  threadId: string
  path: string
}) => {
  try {
    connectToDB()
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        $push: { reposts: threadId },
      },
    )
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
export const unrepost = async ({
  userId,
  threadId,
  path,
}: {
  userId: string
  threadId: string
  path: string
}) => {
  try {
    connectToDB()
    const user = await User.findOne({ _id: userId })
    if (!user) throw new Error(`User not found`)
    const updatedReposts = user.reposts.filter(
      (thread: string) => thread !== threadId,
    )
    await User.findByIdAndUpdate(
      { _id: userId },
      {
        reposts: updatedReposts,
      },
    )
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
