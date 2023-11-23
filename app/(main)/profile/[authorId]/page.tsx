import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { getUserByAuthorId } from "@/lib/actions/user.actions"
import mongoose from "mongoose"
import Image from "next/image"

type Props = {
  params: {
    authorId: string
  }
}
const ProfilePage = async ({ params: { authorId } }: Props) => {
  const author = await getUserByAuthorId(authorId)
  const formatAuthorId = new mongoose.Types.ObjectId(authorId)
  // console.log(formatAuthorId)
  const posts = await getPostsByAuthorId(formatAuthorId)
  // console.log(author)
  /* const threads = posts.filter(
    (post) => post.parentId === undefined || post.parentId === null,
  ) */
  console.log(posts[0].children)
  // console.log(threads)

  return (
    <div>
      <h2>{author.name}</h2>
      <h2>{author.username}</h2>
      <Image
        src={author?.profilePhoto}
        alt="author-pic"
        height={48}
        width={48}
        className="h-12 w-12 rounded-full"
      />
      <p>{author.bio}</p>
      <p>{author.visibility}</p>
    </div>
  )
}
export default ProfilePage
