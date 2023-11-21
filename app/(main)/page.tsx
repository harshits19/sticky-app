import { getUser } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

const MainLayout = async () => {
  const user = await currentUser()
  if (!user) return null
  const userInfo = await getUser(user.id)
  if (!userInfo?.onboarded) redirect("/onboarding")

  // updateUser({ userId: "23213", name: "hasthi", path: "/abc" })
  return <div>Homepage</div>
}
export default MainLayout
