import mongoose from "mongoose"

type PostProps = {
  _id: mongoose.Schema.Types.ObjectId
  authorId: string
  text: string
  postImages: string[]
  children: string[]
  created: Date
  updated: Date
}
