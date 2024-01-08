"use client"
import Link from "next/link"
import {
  CreateIcon,
  HeartIcon,
  HomeIcon,
  SearchIcon,
  UserIcon,
} from "@/components/shared/Icons"
import { usePathname } from "next/navigation"
import { markReadNotification } from "@/lib/actions/notification.actions"
import { Circle } from "lucide-react"

interface SidebarProps {
  userId: string
  notificationStatus: boolean
  variant: "mobile" | "desktop"
}

const LeftSidebarItems = ({
  userId,
  notificationStatus,
  variant,
}: SidebarProps) => {
  const pathname = usePathname()
  if (variant === "desktop")
    return (
      <>
        <Link href="/" className="contents">
          <div className="flex w-max items-center gap-x-4  rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <HomeIcon
              className={`${
                pathname === "/" ? "fill-current" : "fill-transparent"
              }`}
            />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/" && "font-bold"
              }`}>
              Home
            </span>
          </div>
        </Link>
        <Link href="/search" className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <SearchIcon />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/search" && "font-bold"
              }`}>
              Search
            </span>
          </div>
        </Link>
        <Link href="/create-post" className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <CreateIcon />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/create-post" && "font-bold"
              }`}>
              Create Post
            </span>
          </div>
        </Link>
        <Link href="/notifications" className="contents">
          <div
            className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6"
            onClick={() => {
              if (notificationStatus === true) markReadNotification(userId)
            }}>
            <div className="relative">
              <HeartIcon
                className={`${
                  pathname === "/notifications"
                    ? "fill-current"
                    : "fill-transparent"
                }`}
              />
              {notificationStatus === true && (
                <span className="absolute -right-2 -top-2">
                  <Circle className="h-2 w-2 fill-blue-500 stroke-blue-500" />
                </span>
              )}
            </div>
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/notifications" && "font-bold"
              }`}>
              Notifications
            </span>
          </div>
        </Link>
        <Link href={`/profile/${userId}`} className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <UserIcon
              className={`${
                pathname === `/profile/${userId}`
                  ? "fill-current"
                  : "fill-transparent"
              }`}
            />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === `/profile/${userId}` && "font-bold"
              }`}>
              Profile
            </span>
          </div>
        </Link>
      </>
    )
  else
    return (
      <>
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
      </>
    )
}
export default LeftSidebarItems
