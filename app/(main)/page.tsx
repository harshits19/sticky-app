import PostCard from "@/components/cards/PostCard"
import { getAllPosts } from "@/lib/actions/thread.actions"
import { PostProps } from "@/types"

const MainLayout = async () => {
  const { posts } = await getAllPosts()
  return (
    <section>
      {posts?.map((post) => {
        return (
          <PostCard
            key={post.authorId}
            content={post.text}
            created={post.created}
            updated={post.updated}
            images={post.postImages}
            author={post.authorId}
          />
        )
      })}
    </section>
  )
}
export default MainLayout
