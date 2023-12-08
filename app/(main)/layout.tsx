import { redirect } from "next/navigation"
import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import { getUser, getUserNotification } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import LightBox from "@/components/modals/LightBox"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const userInfo = await getUser()
  if (!userInfo?.onboarded) redirect("/onboarding")
  const notificationStatus = await getUserNotification(userInfo._id)
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full justify-center xl:max-w-7xl">
        <LeftSidebar
          userId={userInfo?._id}
          username={userInfo?.username}
          name={userInfo?.name}
          imageURL={userInfo?.profilePhoto}
          notificationStatus={notificationStatus?.hasNotification}
        />
        <section className="w-full pb-40 sm:max-w-xl">{children}</section>
        <RightSidebar userId={userInfo?._id} />
      </main>
      <Bottombar
        userId={userInfo?._id}
        notificationStatus={notificationStatus?.hasNotification}
      />
      <LightBox />
    </>
  )
}
export default MainLayout
