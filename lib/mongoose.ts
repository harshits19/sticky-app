import mongoose from "mongoose"

let isConnected = false

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)
  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found")
  if (isConnected) {
    console.log("Already connected to Database")
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL)
    // console.log("connection to database established")
  } catch (err: any) {
    console.log(`Error while connecting to DB: ${err}`)
  }
}
