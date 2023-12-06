import PostCard from "@/components/cards/PostCard"
import Navbar from "@/components/shared/Navbar"
import CreatePost from "@/app/(main)/create-post/page"
import { getAllPosts } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  const userInfo = await getUser()
  return (
    <>
      <Navbar authorId={userInfo._id} navTitle="Home"/>
      <CreatePost />
      <div>
        {posts?.length === 0 ? (
          <p className="pt-8 text-center text-xl font-semibold">No Posts</p>
        ) : (
          posts?.map((post: any) => {
            return (
              <PostCard
                key={post.authorId}
                text={post.text}
                _id={post._id}
                created={post.created}
                postImages={post.postImages}
                authorId={post.authorId}
                userId={userInfo._id}
                likes={post.likes}
                replies={post.children?.length}
                reposts={userInfo.reposts}
              />
            )
          })
        )}
      </div>
    </>
  )
}
export default HomePage
