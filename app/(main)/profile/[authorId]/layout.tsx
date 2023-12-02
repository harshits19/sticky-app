import Navbar from "@/components/shared/Navbar"
import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { getUser, getUserByAuthorId } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import mongoose from "mongoose"

const ProfileLayout = async ({
  children,
  params: { authorId },
}: {
  children: React.ReactNode
  params: { authorId: string }
}) => {
  const author = await getUserByAuthorId(authorId)
  const formatAuthorId = new mongoose.Types.ObjectId(authorId)
  const { posts } = await getPostsByAuthorId(formatAuthorId)
  return (
    <>
      <Navbar
        authorId={authorId}
        postsNum={posts?.length}
        authorName={author.name}
        username={author.username}
      />
      {children}
    </>
  )
}
export default ProfileLayout
