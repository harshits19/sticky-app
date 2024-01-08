import PostCard from "@/components/cards/PostCard"
import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { Thread, User } from "@/types"

const ThreadsTab = async ({
  authorId,
  userInfo,
  authorName,
}: {
  authorId: string
  userInfo: User
  authorName: string
}) => {
  const { posts } = await getPostsByAuthorId(authorId)
  return (
    <>
      {posts?.length === 0 ? (
        <div className="px-4 pt-6 text-center">
          <p className="text-xl font-bold">{`@${authorName} hasn’t posted anything`}</p>
          <p className="text-sm">
            When they do, those posts will show up here.
          </p>
        </div>
      ) : (
        posts?.map((thread: Thread) => (
          <PostCard
            key={thread?._id}
            post={thread}
            reposts={userInfo?.reposts}
            userId={userInfo?._id}
          />
        ))
      )}
    </>
  )
}
export default ThreadsTab
