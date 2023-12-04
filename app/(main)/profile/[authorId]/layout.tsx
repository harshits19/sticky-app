import Navbar from "@/components/shared/Navbar"
import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { getUserByAuthorId } from "@/lib/actions/user.actions"

const ProfileLayout = async ({
  children,
  params: { authorId },
}: {
  children: React.ReactNode
  params: { authorId: string }
}) => {
  const author = await getUserByAuthorId(authorId)
  const { posts } = await getPostsByAuthorId(authorId)
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
