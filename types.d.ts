import mongoose from "mongoose"

interface PostCardProps {
  text: string
  _id: string
  created: Date
  postImages: string[]
  authorId: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  userId: string
  likes: string[]
  reposts: string[]
  replies: number
  parentId?: string | null
  comment?: boolean
}

type Post = {
  _id: string
  authorId: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  text: string
  postImages: string[]
  parentId: string
  children: string[]
  created: Date
  likes: string[]
}

type User = {
  _id: string
  bio: string
  created: Date
  followers: string
  followings: string[]
  link: string
  name: string
  onboarded: boolean
  profilePhoto: string
  reposts: string[]
  userLabel: string
  userPosts: string[]
  username: string
  visibility: string
}
