import Image from "next/image"
import Link from "next/link"
import { NotificationProps } from "@/types"
import {
  LikeIcon,
  ReplyIcon,
  RepostIcon,
  UserIcon,
} from "@/components/shared/Icons"

const NotificationCard = ({
  notification,
}: {
  notification: Partial<NotificationProps>
}) => {
  return (
    <Link
      href={
        notification.type === "follow"
          ? `/profile/${notification.userId?._id.toString()}`
          : `/thread/${notification.threadId}`
      }
      className="contents">
      <div className="flex px-6 py-4 hover:bg-muted">
        <div className="w-12">
          {notification.type === "like" && (
            <LikeIcon className="h-6 w-6 fill-red-500 stroke-red-500" />
          )}
          {notification.type === "reply" && <ReplyIcon className="h-6 w-6" />}
          {notification.type === "repost" && (
            <RepostIcon className="h-6 w-6 fill-green-500 stroke-green-500" />
          )}
          {notification.type === "follow" && (
            <UserIcon className="h-6 w-6 fill-blue-500 stroke-blue-500" />
          )}
        </div>
        <div className="flex w-full flex-col">
          <Image
            src={
              notification.userId?.profilePhoto ||
              "https://files.edgestore.dev/3zgmkhgty15vn9ga/publicFiles/_public/aa6eed17-f167-4f48-9eac-3883ec6bd6d1.png"
            }
            height={32}
            width={32}
            alt="profile-pic"
            className="rounded-full"
          />
          <div className="mt-1 flex gap-x-1 flex-wrap">
            <b>{notification.userId?.name}</b>
            {notification.type === "like" && " liked your post"}
            {notification.type === "reply" && " replied to your post"}
            {notification.type === "repost" && " reposted your post"}
            {notification.type === "follow" && " followed you"}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default NotificationCard
