"use client"
import { likePost, dislikePost } from "@/lib/actions/thread.actions"
import { LikeIcon, ReplyIcon, RepostIcon, ShareIcon } from "./Icons"
import { formatNum } from "@/hooks/useFormatNum"
import { usePathname } from "next/navigation"
import Link from "next/link"

interface Props {
  threadId: string
  userId: string
  likes: string[]
  replies: number
}

const ReactionStrip = ({ threadId, userId, likes, replies }: Props) => {
  const pathname = usePathname()
  const status = likes.find((like) => userId === like) ? true : false
  const handleReaction = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (status)
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
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div
          id={threadId}
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted"
          onClick={(e) => handleReaction(e)}>
          <LikeIcon
            className={
              status ? "fill-red-500 stroke-red-500" : "stroke-current"
            }
          />
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted">
          <Link href={`/thread/${threadId}`}>
            <ReplyIcon className="" />
          </Link>
        </div>
        <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full hover:bg-muted">
          <RepostIcon className="" />
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
