import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
  authorId: { type: String, ref: "User", required: true },
  text: { type: String, required: true },
  postImages: { type: [String] },
  created: { type: Date, default: Date.now },
  parentId: { type: String },
  likes: [{ type: String, ref: "User" }],
  children: [{ type: String, ref: "Thread" }],
})
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)
export default Thread
