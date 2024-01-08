import { redirect } from "next/navigation"
import PostCard from "@/components/cards/PostCard"
import Navbar from "@/components/shared/Navbar"
import CreatePost from "@/app/(main)/create-post/page"
import { getAllPosts } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { Thread } from "@/types"

const HomePage = async () => {
  const { posts } = await getAllPosts()
  const userInfo = await getUser()
  if (!userInfo) return
  if (!userInfo?.onboarded) redirect("/onboarding")
  return (
    <>
      <Navbar authorId={userInfo._id} navTitle="Home" />
      <CreatePost />
      {
        <div>
          {posts?.length === 0 ? (
            <p className="pt-8 text-center text-xl font-semibold">No Posts</p>
          ) : (
            posts?.map((post: Thread) => {
              return (
                <PostCard
                  key={post._id}
                  post={post}
                  userId={userInfo._id}
                  reposts={userInfo.reposts}
                />
              )
            })
          )}
        </div>
      }
    </>
  )
}
export default HomePage
