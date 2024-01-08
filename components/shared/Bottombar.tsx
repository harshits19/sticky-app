import LeftSidebarItems from "@/components/shared/LeftSidebarItems"
import { getUser, getUserNotification } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"

const Bottombar = async () => {
  const user = await currentUser()
  if (!user) return
  const userInfo = await getUser()
  const notificationStatus = await getUserNotification(userInfo._id)
  return (
    <main className="fixed bottom-0 left-0 right-0 flex w-full justify-evenly border-t-[1px] border-t-muted bg-background sm:hidden">
      <LeftSidebarItems
        userId={userInfo?._id}
        notificationStatus={notificationStatus?.hasNotification}
        variant="mobile"
      />
    </main>
  )
}
export default Bottombar
