import CreatePostForm from "@/components/forms/CreatePostForm"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
const CreatePost = async () => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  return (
    <div className="flex px-4 pt-4 border-b border-muted">
      <div className="w-12">
        <Link href={`/profile/${userInfo._id.toString()}`} className="contents">
          <Image
            src={userInfo?.profilePhoto}
            height={40}
            width={40}
            alt="profile-image"
            className="rounded-full h-10 w-10"
          />
        </Link>
      </div>
      <CreatePostForm authorId={userInfo._id.toString()} />
    </div>
  )
}
export default CreatePost
