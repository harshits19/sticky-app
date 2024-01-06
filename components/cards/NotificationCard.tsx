"use client"
import Image from "next/image"
import { NotificationProps } from "@/types"
import {
  LikeIcon,
  ReplyIcon,
  RepostIcon,
  UserIcon,
} from "@/components/shared/Icons"
import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { useRouter } from "next/navigation"

const NotificationCard = ({
  notification,
}: {
  notification: NotificationProps
}) => {
  const router = useRouter()
  const handlePostClick = () => {
    notification.type === "follow"
      ? router.push(`/profile/${notification.userId._id}`)
      : router.push(`/thread/${notification.threadId._id}`)
  }
  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    router.push(`/profile/${notification.userId._id}`)
  }
  return (
    <div
      className="flex w-full cursor-pointer border-b border-muted px-4 py-2 text-base hover:bg-muted sm:px-6 sm:py-4"
      onClick={handlePostClick}>
      <div className="w-6 flex-shrink-0 sm:w-10">
        {notification.type === "like" && (
          <LikeIcon className="h-5 w-5 fill-red-500 stroke-red-500 sm:h-6 sm:w-6" />
        )}
        {notification.type === "reply" && (
          <ReplyIcon className="h-5 w-5 sm:h-6 sm:w-6" />
        )}
        {notification.type === "repost" && (
          <RepostIcon className="h-5 w-5 fill-green-500 stroke-green-500 sm:h-6 sm:w-6" />
        )}
        {notification.type === "follow" && (
          <UserIcon className="h-5 w-5 fill-blue-500 stroke-blue-500 sm:h-6 sm:w-6" />
        )}
      </div>
      <div className="flex w-full">
        <div className="w-8 flex-shrink-0 sm:w-10">
          <Image
            src={
              notification.userId?.profilePhoto ||
              "https://files.edgestore.dev/3zgmkhgty15vn9ga/publicFiles/_public/aa6eed17-f167-4f48-9eac-3883ec6bd6d1.png"
            }
            height={32}
            width={32}
            alt="profile-pic"
            className="h-6 w-6 rounded-full sm:h-8 sm:w-8"
            onClick={handleAuthorClick}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-x-1">
            <p
              onClick={handleAuthorClick}
              className="font-bold hover:underline">
              {notification.userId?.name}
            </p>
            <p>
              {notification.type === "like" && " liked your post"}
              {notification.type === "reply" && " replied to your post"}
              {notification.type === "repost" && " reposted your post"}
              {notification.type === "follow" && " followed you"}
            </p>
          </div>
          <div className="line-clamp-1 text-muted-foreground/90">
            {notification?.threadId?.text}
          </div>
        </div>
      </div>
      <div className="pl-2 text-sm text-muted-foreground shrink-0">
        {calculateTimeDifference(notification?.created)}
      </div>
    </div>
  )
}

export default NotificationCard
