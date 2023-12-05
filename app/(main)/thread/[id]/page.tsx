import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import Navbar from "@/components/shared/Navbar"
import PostCard from "@/components/cards/PostCard"
import ThreadCard from "@/components/cards/ThreadCard"
import CreateCommentForm from "@/components/forms/CreateCommentForm"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Post } from "@/types"

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
      <Navbar navTitle="Post" />
      <ThreadCard
        key={post.authorId}
        text={post.text}
        _id={id}
        created={post.created}
        postImages={post.postImages}
        authorId={post.authorId}
        likes={post.likes}
        replies={post.children?.length}
        userId={userInfo._id.toString()}
        reposts={userInfo.reposts}
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
          userId={userInfo._id.toString()}
        />
      </div>
      {post?.children &&
        post?.children?.map((thread: Post) => {
          return (
            <PostCard
              key={thread._id.toString()}
              text={thread.text}
              _id={thread._id.toString()}
              created={thread.created}
              postImages={thread.postImages}
              authorId={thread.authorId}
              likes={thread?.likes}
              replies={thread.children?.length}
              userId={userInfo._id.toString()}
              reposts={userInfo.reposts}
              comment
            />
          )
        })}
    </>
  )
}
export default ThreadPage
