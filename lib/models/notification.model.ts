import mongoose from "mongoose"

const notificationSchema = new mongoose.Schema({
  authorId: { type: String, ref: "User", required: true },
  userId: { type: String, ref: "User" },
  threadId: { type: String, ref: "Thread" },
  type: { type: String, required: true },
  created: { type: Date, default: Date.now },
})
const Notification =
  mongoose.models.Notification ||
  mongoose.model("Notification", notificationSchema)
export default Notification

// Author -- Recieve Notification
// User -- Activity Performer
