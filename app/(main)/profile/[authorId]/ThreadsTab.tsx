import PostCard from "@/components/cards/PostCard"
import { Post, User } from "@/types"
const ThreadsTab = ({ posts, userInfo }: { posts: any; userInfo: User }) => {
  return (
    <>
      {posts.length === 0 ? (
        <p className="p-4 text-center font-medium">No posts found!</p>
      ) : (
        posts?.map((thread: Post) => (
          <PostCard
            key={thread._id.toString()}
            text={thread.text}
            _id={thread._id.toString()}
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
export default ThreadsTab
