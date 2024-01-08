import { Thread, User } from "@/types"
import ReplyThread from "@/app/(main)/profile/[authorId]/ReplyThread"
import { getRepliesByAuthorId } from "@/lib/actions/thread.actions"

const RepliesTab = async ({
  authorId,
  userInfo,
  authorName,
}: {
  authorId: string
  userInfo: User
  authorName: string
}) => {
  const { replies } = await getRepliesByAuthorId(authorId)
  return (
    <>
      {replies?.length === 0 ? (
        <div className="px-4 pt-6 text-center">
          <p className="text-xl font-bold">{`@${authorName} hasn’t replied to any posts`}</p>
          <p className="text-sm">
            When they do, those replies will show up here.
          </p>
        </div>
      ) : (
        replies?.map((thread: Thread) => (
          <ReplyThread thread={thread} userInfo={userInfo} key={thread?._id} />
        ))
      )}
    </>
  )
}
export default RepliesTab
