import PostCard from "@/components/cards/PostCard"
import { PostProps } from "@/types"

const ThreadsTab = ({
  posts,
  userId,
}: {
  posts: PostProps[]
  userId: string
}) => {
  return (
    <div>
      {posts?.map((thread: any) => (
        <PostCard
          key={thread._id.toString()}
          content={thread.text}
          id={thread._id.toString()}
          created={thread.created}
          updated={thread.updated}
          images={thread.postImages}
          author={thread.authorId}
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
