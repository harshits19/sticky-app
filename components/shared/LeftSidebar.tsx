import Link from "next/link"
import Image from "next/image"
import { currentUser } from "@clerk/nextjs"
import LeftSidebarItems from "@/components/shared//LeftSidebarItems"
import LeftSidebarProfileBtn from "@/components/shared//LeftSidebarProfileBtn"
import { getUser, getUserNotification } from "@/lib/actions/user.actions"

const LeftSidebar = async () => {
  //works as sidebar on desktop and bottombar in mobile
  const user = await currentUser()
  if (!user) return
  const userInfo = await getUser()
  const notificationStatus = await getUserNotification(userInfo?._id)
  return (
    <>
      <section className="sticky top-0 hidden h-screen flex-col justify-between border-r-[1px] border-muted bg-background px-1 pb-8 pt-2 sm:flex lg:w-full lg:max-w-xs lg:flex-1 lg:pl-4">
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-4 flex items-center gap-1 px-4">
            <Link href="/" className="contents">
              <Image src="/logo144.png" alt="logo" height={36} width={36} />
              <p className="hidden text-lg font-semibold lg:block">Sticky</p>
            </Link>
          </div>
          <LeftSidebarItems
            notificationStatus={notificationStatus?.hasNotification}
            userId={userInfo._id}
            variant="desktop"
          />
        </div>
        <LeftSidebarProfileBtn
          userId={userInfo?._id}
          username={userInfo?.username}
          name={userInfo?.name}
          imageURL={userInfo?.profilePhoto}
        />
      </section>
      <section className="fixed bottom-0 left-0 right-0 z-50 flex w-full justify-evenly border-t-[1px] border-t-muted bg-background sm:hidden">
        <LeftSidebarItems
          userId={userInfo?._id}
          notificationStatus={notificationStatus?.hasNotification}
          variant="mobile"
        />
      </section>
    </>
  )
}
export default LeftSidebar
