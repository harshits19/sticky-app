import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Navbar from "@/components/shared/Navbar"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  if (!user) redirect("/sign-in")
  const userInfo = await getUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full justify-center xl:max-w-7xl">
        <LeftSidebar
          userId={userInfo?._id.toString()}
          username={userInfo?.username}
          name={userInfo?.name}
          imageURL={userInfo?.profilePhoto}
        />
        <section className="w-full max-w-lg md:max-w-xl">
          <Navbar userId={userInfo?._id.toString()} />
          {children}
        </section>
        <RightSidebar />
      </main>
      <Bottombar userId={userInfo?._id.toString()} />
    </>
  )
}
export default MainLayout
