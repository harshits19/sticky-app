"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { markReadNotification } from "@/lib/actions/notification.actions"
import { HomeIcon, SearchIcon, CreateIcon, HeartIcon, UserIcon } from "./Icons"
import { Circle } from "lucide-react"

const Bottombar = ({
  userId,
  notificationStatus,
}: {
  userId: string
  notificationStatus: boolean
}) => {
  const pathname = usePathname()
  return (
    <main className="sticky bottom-0 left-0 flex w-full justify-evenly border-t-[1px] border-t-muted bg-background sm:hidden">
      <Link href="/" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <HomeIcon
            className={`${
              pathname === "/" ? "fill-current" : "fill-transparent"
            }`}
          />
        </div>
      </Link>
      <Link href="/search" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <SearchIcon />
        </div>
      </Link>
      <Link href="/create-post" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <CreateIcon />
        </div>
      </Link>
      <Link href="/notifications" className="contents">
        <div
          className="relative flex w-full items-center justify-center rounded-md py-3 hover:bg-muted"
          onClick={() => {
            if (notificationStatus === true) markReadNotification(userId)
          }}>
          <HeartIcon
            className={`${
              pathname === "/notifications"
                ? "fill-current"
                : "fill-transparent"
            }`}
          />
          {notificationStatus === true && (
            <span className="absolute right-4 top-1">
              <Circle className="h-2 w-2 fill-blue-500 stroke-blue-500" />
            </span>
          )}
        </div>
      </Link>
      <Link href={`/profile/${userId}`} className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <UserIcon
            className={`${
              pathname === `/profile/${userId}`
                ? "fill-current"
                : "fill-transparent"
            }`}
          />
        </div>
      </Link>
    </main>
  )
}
export default Bottombar
