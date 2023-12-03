import PostCard from "@/components/cards/PostCard"
import { Post } from "@/types"

const ThreadsTab = ({ posts, userId }: { posts: any; userId: string }) => {
  return (
    <div>
      {posts?.map((thread: Post) => (
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
          userId={userId}
        />
      ))}
    </div>
  )
}
export default ThreadsTab
