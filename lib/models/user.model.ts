import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  profilePhoto: { type: String },
  bio: { type: String, unique: false },
  link: { type: String },
  userLabel: { type: String },
  visibility: { type: Boolean, default: true },
  onboarded: { type: Boolean, default: false },
  userPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thread",
    },
  ],
})
const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User
