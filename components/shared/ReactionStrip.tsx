"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { formatNum } from "@/hooks/useFormatNum"
import {
  likePost,
  dislikePost,
  repost,
  unrepost,
} from "@/lib/actions/thread.actions"
import {
  LikeIcon,
  ReplyIcon,
  RepostIcon,
  ShareIcon,
} from "@/components/shared/Icons"

interface Props {
  threadId: string
  userId: string
  likes: string[]
  reposts: string[]
  replies: number
}

const ReactionStrip = ({
  threadId,
  userId,
  likes,
  replies,
  reposts,
}: Props) => {
  const pathname = usePathname()
  const isLiked = likes?.find((like) => userId === like) ? true : false
  const isReposted = reposts?.find((thread) => thread === threadId)
    ? true
    : false
  const handleReaction = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isLiked)
      await dislikePost({
        userId,
        threadId,
        path: pathname,
      })
    else
      await likePost({
        userId,
        threadId,
        path: pathname,
      })
  }
  const handleRepost = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isReposted)
      await unrepost({
        userId,
        threadId,
        path: pathname,
      })
    else
      await repost({
        userId,
        threadId,
        path: pathname,
      })
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div
          id={threadId}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
          onClick={(e) => handleReaction(e)}>
          <LikeIcon
            className={
              isLiked ? "fill-red-500 stroke-red-500" : "stroke-current"
            }
            title={isLiked ? "Unlike" : "Like"}
          />
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted">
          <Link href={`/thread/${threadId}`}>
            <ReplyIcon className="" />
          </Link>
        </div>
        <div
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
          onClick={handleRepost}>
          <RepostIcon
            className={isReposted ? " fill-green-500" : "fill-current"}
            title={isReposted ? "Unpost" : "Repost"}
          />
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted">
          <ShareIcon className="" />
        </div>
      </div>
      <div className="flex pl-2 text-sm text-muted-foreground/90">
        {replies > 0 &&
          `${formatNum(replies)} ${replies > 1 ? "replies" : "reply"}`}
        {replies > 0 && likes.length > 0 && <span className="px-1">·</span>}
        {likes.length > 0 &&
          `${formatNum(likes.length)} ${likes.length > 1 ? "likes" : "like"}`}
      </div>
    </div>
  )
}
export default ReactionStrip
