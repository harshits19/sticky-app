import PostCard from "@/components/cards/PostCard"
import { Post, User } from "@/types"
const RepostsTab = ({
  reposts,
  userInfo,
}: {
  reposts: any
  userInfo: User
}) => {
  return (
    <>
      {reposts.length === 0 ? (
        <div className="px-4 pt-6 text-center">
          <p className="text-xl font-bold">{`@${userInfo.username} hasn’t resposted any posts`}</p>
          <p className="text-sm">When they do, those posts will show up here.</p>
        </div>
      ) : (
        reposts?.map((thread: Post) => (
          <PostCard
            key={thread._id}
            text={thread.text}
            _id={thread._id}
            created={thread.created}
            postImages={thread.postImages}
            authorId={thread.authorId}
            parentId={thread?.parentId}
            likes={thread?.likes}
            replies={thread.children?.length}
            reposts={userInfo?.reposts}
            userId={userInfo?._id}
          />
        ))
      )}
    </>
  )
}
export default RepostsTab
