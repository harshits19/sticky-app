import mongoose, { Document } from "mongoose"
import { TypeUser } from "./lib/models/user.model"

type ProfileCardProps = {
  _id: string
  name: string
  profilePhoto: string
  username: string
  bio: string
  followers: string[]
}
/* New Types */

interface Thread {
  text: string
  children: string[] | TypeThread
  likes: string[]
  authorId: string | TypeUser
  postImages: string[]
  created: Date
  parentId?: string | null | undefined | TypeThread
}

interface User {
  id: string
  name: string
  username: string
  profilePhoto?: string | null | undefined
  bio?: string | null | undefined
  link?: string | null | undefined
  userLabel?: string | null | undefined
  visibility: string
  onboarded: boolean
  created: Date
  userPosts: string[] | TypeThread[]
  reposts: string[] | TypeThread[]
  followings: string[] | TypeUser[]
  followers: string[] | TypeUser[]
  notifications: string[] | TypeNotification[]
  hasNotification?: boolean | null | undefined
}

interface Notification {
  authorId: string | TypeUser
  type: string
  created: Date
  userId?: string | null | undefined | TypeUser
  threadId?: string | null | undefined | TypeThread
}

export interface Thread extends Document {}
export interface User extends Document {}
export interface Notification extends Document {}
