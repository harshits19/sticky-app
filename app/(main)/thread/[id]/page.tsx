import PostCard from "@/components/cards/PostCard"
import CreateCommentForm from "@/components/forms/CreateCommentForm"
import { getThreadById } from "@/lib/actions/thread.actions"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

type Props = {
  params: {
    id: string
  }
}
type Post = {
  _id: string
  authorId: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  text: string
  postImages: string[]
  parentId: string
  children: string[]
  created: Date
  updated: Date
}
const ThreadPage = async ({ params: { id } }: Props) => {
  const post = await getThreadById(id)
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  // if(!userInfo) return null
  // console.log(post)
  return (
    <div>
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
      <CreateCommentForm
        parentId={post._id.toString()}
        authorId={userInfo._id.toString()}
      />
      {post?.children ? (
        post?.children?.map((thread: Post) => {
          return (
            <PostCard
              key={post.authorId}
              content={thread.text}
              id={thread._id.toString()}
              created={thread.created}
              updated={thread.updated}
              images={thread.postImages}
              author={thread.authorId}
              parentId={thread.parentId}
            />
          )
        })
      ) : (
        <div>No comments</div>
      )}
    </div>
  )
}
export default ThreadPage
