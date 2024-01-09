import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import PostCard from "@/components/cards/PostCard"
import ThreadCard from "@/components/cards/ThreadCard"
import CreateCommentForm from "@/components/forms/CreateCommentForm"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Thread } from "@/types"

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string }
}): Promise<Metadata> {
  const post = await getThreadById(id)
  return {
    title: `@${post?.authorId?.username} · ${post?.text?.slice(0, 100)}`,
  }
}

const ThreadPage = async ({
  params: { id },
}: {
  params: {
    id: string
  }
}) => {
  const post = await getThreadById(id)
  const userInfo = await getUser()
  return (
    <>
      <ThreadCard
        key={post?.authorId}
        post={post}
        userId={userInfo?._id}
        reposts={userInfo?.reposts}
      />
      <div className="flex border-b border-muted px-4 pt-2">
        <div className="w-12">
          <Link href={`/profile/${userInfo?._id}`} className="contents">
            <Image
              src={userInfo?.profilePhoto}
              height={40}
              width={40}
              alt="profile-image"
              className="h-10 w-10 rounded-full"
            />
          </Link>
        </div>
        <CreateCommentForm parentId={post?._id} userId={userInfo?._id} />
      </div>
      {post?.children &&
        post?.children?.map((thread: Thread) => {
          return (
            <PostCard
              key={thread._id}
              post={thread}
              userId={userInfo?._id}
              reposts={userInfo?.reposts}
            />
          )
        })}
    </>
  )
}
export default ThreadPage
