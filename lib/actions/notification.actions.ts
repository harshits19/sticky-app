"use server"
import { connectToDB } from "@/lib/mongoose"
import { currentUser } from "@clerk/nextjs/server"
import User from "@/lib/models/user.model"
import Thread from "@/lib/models/thread.model"
import Notification from "@/lib/models/notification.model"

export const getAllNotifications = async () => {
  try {
    connectToDB()
    const user = await currentUser()
    if (!user) return
    const userInfo = await User.findOne({ id: user.id }).select("_id")
    const userId = userInfo._id.toString()
    return await Notification.find({ authorId: userId })
      .populate({
        path: "userId",
        model: User,
        select: "_id name username profilePhoto bio",
      })
      .populate({
        path: "threadId",
        model: Thread,
        select: "text",
      })
      .sort({ created: "desc" })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const postNotification = async ({
  authorId,
  userId,
  threadId,
  type,
}: {
  authorId: string
  userId: string
  threadId?: string
  type: string
}) => {
  try {
    connectToDB()
    await Notification.create({
      authorId,
      userId,
      threadId,
      type,
    })
    await User.findByIdAndUpdate(authorId, {
      hasNotification: true,
    })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const markReadNotification = async (userId: string) => {
  try {
    connectToDB()
    await User.findByIdAndUpdate(userId, {
      hasNotification: false,
    })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
