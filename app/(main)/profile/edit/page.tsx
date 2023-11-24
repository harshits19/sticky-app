import ProfileEditForm from "@/components/forms/ProfileEditForm"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

const EditPage = async () => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  const userData = {
    id: user?.id ? user?.id : "",
    name: userInfo?.name
      ? userInfo?.name
      : user?.firstName
      ? user?.firstName
      : "",
    username: userInfo?.username ? userInfo?.username : "",
    profilePhoto: userInfo?.profilePhoto
      ? userInfo?.profilePhoto
      : user?.imageUrl
      ? user?.imageUrl
      : "https://files.edgestore.dev/3zgmkhgty15vn9ga/publicFiles/_public/aa6eed17-f167-4f48-9eac-3883ec6bd6d1.png",
    bio: userInfo?.bio ? userInfo?.bio : "",
    link: userInfo?.link ? userInfo?.link : "",
    userLabel: userInfo?.userLabel ? userInfo?.userLabel : "",
    visibility: userInfo?.visibility ? userInfo?.visibility : true,
  }
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Edit Profile</h2>
      <div className="flex justify-center">
        <ProfileEditForm user={userData} btnTitle="Update" editForm />
      </div>
    </div>
  )
}
export default EditPage
