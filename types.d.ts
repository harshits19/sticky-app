import mongoose from "mongoose"

interface PostProps {
  content: string
  id: string
  created: Date
  updated: Date
  images: string[]
  author: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  parentId?: string | null
  likes: string[]
  replies: number
  comment?: boolean
  userId: string
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
