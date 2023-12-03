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
  updated: Date
  likes: string[]
}
