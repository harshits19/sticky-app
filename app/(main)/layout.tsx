import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Bottombar from "@/components/shared/Bottombar"
import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import Navbar from "@/components/shared/Navbar"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")
  return (
    <div>
      <Navbar />
      <main className="flex h-full flex-row justify-between">
        <LeftSidebar />
        <section className="h-full">
          <div className="w-96">{children}</div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </div>
  )
}
export default MainLayout
