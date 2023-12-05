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

type NewPost = {
  key?: string
  _id: mongoose.Schema.Types.ObjectId
  authorId: {
    _id: mongoose.Schema.Types.ObjectId
    name: string
    username: string
    profilePhoto: string
  }
  text: string
  postImages: string[]
  parentId: string | null
  children: {
    _id: mongoose.Schema.Types.ObjectId
  }[]
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

type ProfileCardProps = {
  _id: string
  name: string
  profilePhoto: string
  username: string
  bio: string
  followers: string[]
}

type NotificationProps = {
  _id: mongoose.Schema.Types.ObjectId
  authorId: string
  userId: {
    _id: mongoose.Schema.Types.ObjectId
    bio: string
    name: string
    profilePhoto: string
    username: string
  }
  threadId: {
    _id: mongoose.Schema.Types.ObjectId
    text: string
  }
  type: string
  created: Date
}
