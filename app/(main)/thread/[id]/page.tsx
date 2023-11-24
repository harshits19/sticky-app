import ThreadCard from "@/components/cards/ThreadCard"
import CreateCommentForm from "@/components/forms/CreateCommentForm"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: {
    id: string
  }
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
  updated: Date
}
const ThreadPage = async ({ params: { id } }: Props) => {
  const post = await getThreadById(id)
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <div>
      <ThreadCard
        key={post.authorId}
        content={post.text}
        id={post._id.toString()}
        created={post.created}
        updated={post.updated}
        images={post.postImages}
        author={post.authorId}
      />
      <div className="flex px-4 pt-2">
        <div className="w-12">
          <Link
            href={`/profile/${userInfo._id.toString()}`}
            className="contents">
            <Image
              src={userInfo?.profilePhoto}
              height={40}
              width={40}
              alt="profile-image"
              className="h-10 w-10 rounded-full"
            />
          </Link>
        </div>
        <CreateCommentForm
          parentId={post._id.toString()}
          authorId={userInfo._id.toString()}
        />
      </div>
      {post?.children &&
        post?.children?.map((thread: Post) => {
          return (
            <ThreadCard
              key={post.authorId}
              content={thread.text}
              id={thread._id.toString()}
              created={thread.created}
              updated={thread.updated}
              images={thread.postImages}
              author={thread.authorId}
              parentId={thread?.parentId}
            />
          )
        })}
    </div>
  )
}
export default ThreadPage
