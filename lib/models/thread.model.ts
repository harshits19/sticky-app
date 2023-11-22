import mongoose from "mongoose"

const threadSchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: { type: String, required: true },
  postImages: { type: [String] },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  parentId: { type: String },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
})
const Thread = mongoose.models.Thread || mongoose.model("Thread", threadSchema)
export default Thread
