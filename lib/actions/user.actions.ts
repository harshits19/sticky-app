"use server"
import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs/server"
import { connectToDB } from "@/lib/mongoose"
import User from "@/lib/models/user.model"
import { postNotification } from "@/lib/actions/notification.actions"

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

// this fn finds User by clerk userId
export const getUser = async () => {
  try {
    connectToDB()
    const user = await currentUser()
    if (!user) throw new Error("User not found in database")
    const userId = user.id
    return await User.findOne({ id: userId })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

// this fn finds User by authorId(post author)
export const getUserByAuthorId = async (authorId: string) => {
  try {
    connectToDB()
    return await User.findOne({ _id: authorId })
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

//used in onbaording / edit profile page (userId from clerk id)
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
}: userProps) => {
  try {
    connectToDB()
    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username?.toLowerCase().trim(),
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

export const getUserNotification = async (userId: string) => {
  try {
    connectToDB()
    return await User.findById(userId).select("hasNotification")
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const followPostAuthor = async (
  authorId: string,
  userId: string,
  pathname: string,
) => {
  try {
    connectToDB()
    await User.findByIdAndUpdate(userId, {
      $push: { followings: authorId },
    })
    await User.findByIdAndUpdate(authorId, {
      $push: { followers: userId },
    })

    postNotification({
      authorId,
      userId,
      type: "follow",
    })
    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}

export const unfollowPostAuthor = async (
  authorId: string,
  userId: string,
  pathname: string,
) => {
  try {
    connectToDB()
    const postAuthor = await User.findById(authorId)
    const currentUser = await User.findById(userId)
    const newFollowings = currentUser.followings.filter(
      (followingId: string) => followingId !== authorId,
    )
    await User.findByIdAndUpdate(userId, {
      followings: newFollowings,
    })
    const updatedFollowers = postAuthor?.followers?.filter(
      (followerId: string) => followerId !== userId,
    )
    await User.findByIdAndUpdate(authorId, {
      followers: updatedFollowers,
    })

    revalidatePath(pathname)
  } catch (error: any) {
    throw new Error(`${error}`)
  }
}
