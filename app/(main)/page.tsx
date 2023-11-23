import PostCard from "@/components/cards/PostCard"
import { getAllPosts } from "@/lib/actions/thread.actions"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  return (
    <section>
      {posts?.length === 0 ? (
        <div>No Posts Found!</div>
      ) : (
        posts?.map((post) => {
          return (
            <PostCard
              key={post.authorId}
              content={post.text}
              id={post._id.toString()}
              created={post.created}
              updated={post.updated}
              images={post.postImages}
              author={post.authorId}
              parentId={post.parentId}
            />
          )
        })
      )}
    </section>
  )
}
export default HomePage
