import PostCard from "@/components/cards/PostCard"
import ReactionStrip from "@/components/shared/ReactionStrip"
import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { PostProps } from "@/types"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const RepliesTab = ({
  replies,
  userId,
}: {
  replies: PostProps[]
  userId: string
}) => {
  return replies.map((thread: any) => (
    <>
      <article
        className="flex px-4 pb-2 pt-4 transition-colors duration-200 hover:bg-muted"
        key={thread.parentId._id.toString()}>
        <div className="flex w-14 flex-col">
          <Link
            href={`/profile/${thread.parentId.authorId._id}`}
            className="contents">
            <Image
              src={thread.parentId.authorId?.profilePhoto}
              alt="author-pic"
              height={40}
              width={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          </Link>
          <div className="-mb-4 mr-2.5 mt-1.5 flex w-0.5 shrink-0 grow basis-auto flex-col self-center bg-muted-foreground/40"></div>
        </div>
        <div className="w-full">
          <div className="flex justify-between">
            <div className="flex items-start gap-x-1">
              <Link
                href={`/profile/${thread.parentId.authorId?._id.toString()}`}
                className="contents">
                <span className="text-sm font-bold hover:underline">
                  {thread.parentId.authorId?.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {"@" + thread.parentId.authorId?.username + " · "}
                </span>
              </Link>
              <p
                className="text-sm text-muted-foreground/75"
                title={format(thread.parentId.created, "dd MMM yyyy hh:mm")}>
                {calculateTimeDifference(thread.parentId.created)}
              </p>
            </div>
            <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted" />
          </div>
          <div className="py-2 text-base leading-none">
            <Link href={`/thread/${thread.parentId._id}`} className="contents">
              {thread.parentId.text}
            </Link>
          </div>
          {thread.parentId.postImages?.length > 0 && (
            <div className="flex gap-x-2 pb-2">
              {thread.parentId.postImages?.map((imgUrl: string) => (
                <div className="relative h-64 w-full" key={imgUrl}>
                  <Image
                    src={imgUrl}
                    alt="post-image"
                    className="rounded-xl"
                    fill
                  />
                </div>
              ))}
            </div>
          )}
          <ReactionStrip
            threadId={thread.parentId._id.toString()}
            userId={userId}
            likes={thread.parentId.likes}
            replies={thread.parentId.children?.length}
          />
        </div>
      </article>
      <PostCard
        key={thread._id.toString()}
        content={thread.text}
        id={thread._id.toString()}
        created={thread.created}
        updated={thread.updated}
        images={thread.postImages}
        author={thread.authorId}
        parentId={thread?.parentId}
        likes={thread?.likes}
        replies={thread.children?.length}
        userId={userId}
        comment
      />
    </>
  ))
}
export default RepliesTab
