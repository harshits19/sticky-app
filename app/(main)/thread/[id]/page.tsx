import Image from "next/image"
import Link from "next/link"
import PostCard from "@/components/cards/PostCard"
import ThreadCard from "@/components/cards/ThreadCard"
import CreateCommentForm from "@/components/forms/CreateCommentForm"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

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
  likes: string[]
}
const ThreadPage = async ({ params: { id } }: Props) => {
  const post = await getThreadById(id)
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <>
      <ThreadCard
        key={post.authorId}
        content={post.text}
        id={id}
        created={post.created}
        updated={post.updated}
        images={post.postImages}
        author={post.authorId}
        likes={post.likes}
        replies={post.children?.length}
        userId={userInfo._id.toString()}
      />
      <div className="flex border-b border-muted px-4 pt-2">
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
            <PostCard
              key={thread._id.toString()}
              content={thread.text}
              id={thread._id.toString()}
              created={thread.created}
              updated={thread.updated}
              images={thread.postImages}
              author={thread.authorId}
              parentId={thread?.parentId}
              likes={post.likes}
              replies={post.children?.length}
              userId={userInfo._id.toString()}
              comment
            />
          )
        })}
    </>
  )
}
export default ThreadPage
