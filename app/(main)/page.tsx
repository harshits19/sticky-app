import PostCard from "@/components/cards/PostCard"
import Navbar from "@/components/shared/Navbar"
import CreatePost from "@/app/(main)/create-post/page"
import { getAllPosts } from "@/lib/actions/thread.actions"
import { currentUser } from "@clerk/nextjs"
import { getUser } from "@/lib/actions/user.actions"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <>
      <Navbar authorId={userInfo._id.toString()} />
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
                text={post.text}
                _id={post._id.toString()}
                created={post.created}
                postImages={post.postImages}
                authorId={post.authorId}
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
