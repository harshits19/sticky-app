"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import PostCard from "@/components/cards/PostCard"
import ReactionStrip from "@/components/shared/ReactionStrip"
import ImageContainer from "@/components/shared/ImageContainer"
import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { MoreHorizontal } from "lucide-react"
import { Thread, User } from "@/types"

const ReplyThread = ({
  thread,
  userInfo,
}: {
  thread: Thread
  userInfo: User
}) => {
  const router = useRouter()
  return (
    <div
      onClick={() => router.push(`/thread/${thread?.parentId?._id}`)}
      className="cursor-pointer">
      <article className="flex px-4 pb-2 pt-4 transition-colors duration-200 hover:bg-muted">
        <div className="flex w-14 flex-col">
          <Link
            href={`/profile/${thread?.parentId?.authorId?._id}`}
            onClick={(e) => e.stopPropagation()}
            className="contents">
            <Image
              src={thread?.parentId?.authorId?.profilePhoto}
              alt="author-pic"
              height={40}
              width={40}
              className="h-10 w-10 rounded-full object-cover object-center"
            />
          </Link>
          <div className="-mb-4 mr-2.5 mt-1.5 flex w-0.5 shrink-0 grow basis-auto flex-col self-center bg-muted-foreground/40"></div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-start gap-x-1">
              <Link
                href={`/profile/${thread?.parentId?.authorId?._id}`}
                className="contents"
                onClick={(e) => e.stopPropagation()}>
                <span className="text-sm font-bold hover:underline">
                  {thread?.parentId?.authorId?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {"@" + thread?.parentId?.authorId?.username + " · "}
                </span>
              </Link>
              <p
                className="text-sm text-muted-foreground/75"
                title={format(
                  new Date(thread?.parentId?.created),
                  "dd MMM yyyy hh:mm",
                )}>
                {calculateTimeDifference(thread?.parentId?.created)}
              </p>
            </div>
            <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted" />
          </div>
          <div className="py-2 text-base leading-none">
            {thread?.parentId?.text}
          </div>
          <ImageContainer
            images={thread?.parentId?.postImages}
            removeImg={() => {}}
          />
          <ReactionStrip
            threadId={thread?.parentId?._id}
            userId={userInfo?._id}
            likes={thread?.parentId?.likes}
            replies={thread?.parentId?.children?.length}
            reposts={userInfo?.reposts}
          />
        </div>
      </article>
      <PostCard
        key={thread?._id}
        post={thread}
        reposts={userInfo?.reposts}
        userId={userInfo?._id}
      />
    </div>
  )
}
export default ReplyThread
