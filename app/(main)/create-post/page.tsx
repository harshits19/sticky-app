import CreatePostForm from "@/components/forms/CreatePostForm"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
type Props = {}
const CreatePost = async (props: Props) => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <div>
      CreatePost
      <CreatePostForm authorId={userInfo._id.toString()} />
    </div>
  )
}
export default CreatePost
