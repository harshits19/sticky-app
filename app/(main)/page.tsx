import PostCard from "@/components/cards/PostCard"
import { getAllPosts } from "@/lib/actions/thread.actions"
import CreatePost from "./create-post/page"
import { currentUser } from "@clerk/nextjs"
import { getUser } from "@/lib/actions/user.actions"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <>
      <CreatePost />
      <div>
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
                userId={userInfo._id.toString()}
                likes={post.likes}
                replies={post.children?.length}
              />
            )
          })
        )}
      </div>
    </>
  )
}
export default HomePage
