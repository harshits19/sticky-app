import CreatePostForm from "@/components/forms/CreatePostForm"
import { getUser } from "@/lib/actions/user.actions"
import Image from "next/image"
import Link from "next/link"
const CreatePost = async () => {
  const userInfo = await getUser()
  return (
    <div className="flex border-b border-muted px-4 pt-4">
      <div className="w-12">
        <Link href={`/profile/${userInfo._id.toString()}`} className="contents">
          <Image
            src={userInfo?.profilePhoto}
            height={40}
            width={40}
            alt="profile-image"
            className="h-10 w-10 rounded-full"
          />
        </Link>
      </div>
      <CreatePostForm userId={userInfo._id.toString()} />
    </div>
  )
}
export default CreatePost
