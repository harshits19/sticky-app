import PostCard from "@/components/cards/PostCard"
import { getAllPosts } from "@/lib/actions/thread.actions"
import CreatePost from "./create-post/page"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  return (
    <>
      <CreatePost />
      <div className="px-4 lg:px-8">
        {posts?.length === 0 ? (
          <p className="pt-8 text-center text-xl font-semibold">
            No Posts Found!
          </p>
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
      </div>
    </>
  )
}
export default HomePage
