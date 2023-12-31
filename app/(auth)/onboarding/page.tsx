import Link from "next/link"
import ProfileEditForm from "@/components/forms/ProfileEditForm"
import { Button } from "@/components/ui/button"
import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { ChevronRight } from "lucide-react"

const OnboardPage = async () => {
  const user = await currentUser()
  const userInfo = await getUser()
  const userData = {
    id: user?.id ? user?.id : "",
    name: userInfo?.name
      ? userInfo?.name
      : user?.firstName && user?.lastName
      ? `${user?.firstName} ${user?.lastName}`
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
    visibility: userInfo?.visibility ? userInfo?.visibility : "true",
  }

  return (
    <main className="relative flex h-full flex-col items-center justify-center">
      <Button size="sm" className="absolute right-0 top-0 m-4 sm:m-8">
        <Link href="/" className="contents" replace={true}>
          Skip <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
      <h1 className="text-5xl font-semibold">Profile</h1>
      <h3 className="mb-10 text-sm">Customize your Sticky profile.</h3>
      <ProfileEditForm user={userData} btnTitle="Create" />
    </main>
  )
}
export default OnboardPage
