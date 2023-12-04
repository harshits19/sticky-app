"use server"
import { revalidatePath } from "next/cache"
import mongoose from "mongoose"
import { postNotification } from "@/lib/actions/notification.actions"
import { connectToDB } from "@/lib/mongoose"
import Thread from "@/lib/models/thread.model"
import User from "@/lib/models/user.model"

interface threadProps {
  userId: string
  parentId?: string
  authorId?: string
  content?: string
  postImg?: string[]
  path: string
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
        select: "_id",
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

//search posts by their post authorId, used in author profile page
export const getPostsByAuthorId = async (authorId: string) => {
  try {
    connectToDB()
    const formatAuthorId = new mongoose.Types.ObjectId(authorId)
    //select those posts(that belongs to author) that have no parent
    const posts = await Thread.find({
      authorId: formatAuthorId,
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
        select: "_id",
      })

    //select reply(belongs to author) and its parent-post(can be of diffrent author)
    const replies = await Thread.find({
      authorId: formatAuthorId,
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

    //Finding reposts of specific User(in this case - post author)
    const reposts = await User.findById({
      _id: authorId,
    })
      .select("reposts")
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

//used in thread page, to get post and all its replies (thread in combination) , here threadId = postId
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
            select: "_id id name username profilePhoto",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "authorId",
              model: User,
              select: "_id id name username profilePhoto",
            },
          },
        ],
      })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const getFollowersByAuthorId = async (authorId: string) => {
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

//the userId(user who create post) becomes authorId of that post
export const createThread = async ({
  userId,
  content,
  postImg,
  path,
}: threadProps) => {
  try {
    connectToDB()
    const createdThread = await Thread.create({
      authorId: userId,
      text: content,
      postImages: postImg,
      parentId: null,
    })
    await User.findByIdAndUpdate(userId, {
      $push: { userPosts: createdThread._id },
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const createComment = async ({
  userId,
  parentId,
  content,
  postImg,
  path,
}: threadProps): Promise<void> => {
  try {
    connectToDB()
    const createdComment = await Thread.create({
      authorId: userId,
      parentId,
      text: content,
      postImages: postImg,
    })

    await Thread.findByIdAndUpdate(parentId, {
      $push: { children: createdComment._id },
    })
    const userInfo = await Thread.findById(parentId).select("authorId")
    if (userInfo.authorId.toString() !== userId)
      postNotification({
        authorId: userInfo.authorId.toString(),
        userId,
        threadId: parentId,
        type: "reply",
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
    const userInfo = await Thread.findById(threadId).select("authorId")
    if (userInfo.authorId.toString() !== userId)
      postNotification({
        authorId: userInfo.authorId.toString(),
        userId,
        threadId,
        type: "like",
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
    await User.findByIdAndUpdate(userId, {
      $push: { reposts: threadId },
    })
    const userInfo = await Thread.findById(threadId).select("authorId")
    if (userInfo.authorId.toString() !== userId)
      postNotification({
        authorId: userInfo.authorId.toString(),
        userId,
        threadId,
        type: "repost",
      })
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
    await User.findByIdAndUpdate(userId, {
      reposts: updatedReposts,
    })
    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
