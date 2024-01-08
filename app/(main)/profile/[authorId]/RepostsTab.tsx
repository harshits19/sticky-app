import PostCard from "@/components/cards/PostCard"
import { getRepostsByAuthorId } from "@/lib/actions/thread.actions"
import { Thread, User } from "@/types"

const RepostsTab = async ({
  authorId,
  userInfo,
  authorName,
}: {
  authorId: string
  userInfo: User
  authorName: string
}) => {
  const { reposts } = await getRepostsByAuthorId(authorId)
  return (
    <>
      {reposts?.reposts.length === 0 ? (
        <div className="px-4 py-36 text-center">
          <p className="text-xl font-bold">{`@${authorName} hasn’t resposted any posts`}</p>
          <p className="text-sm">
            When they do, those posts will show up here.
          </p>
        </div>
      ) : (
        reposts?.reposts?.map((thread: Thread) => (
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
export default RepostsTab
