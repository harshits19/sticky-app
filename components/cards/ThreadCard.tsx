import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactionStrip from "@/components/shared/ReactionStrip"

interface ThreadProps {
  content: string
  id: string
  created: Date
  updated: Date
  images: string[]
  author: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  likes: string[]
  replies: number
  userId: string
  parentId?: string | null
}
const ThreadCard = ({
  content,
  id,
  created,
  updated,
  images,
  author,
  likes,
  replies,
  userId,
  parentId,
}: ThreadProps) => {
  return (
    <article className="flex border-y border-muted p-4">
      <div className="h-full w-14">
        <Link href={`/profile/${author._id}`} scroll={false} className="contents">
          <Image
            src={author?.profilePhoto}
            alt="author-pic"
            height={40}
            width={40}
            className="h-10 w-10 rounded-full object-cover"
          />
        </Link>
      </div>
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <Link
              href={`/profile/${author?._id.toString()}`}
              scroll={false}
              className="contents">
              <span className="text-sm font-bold hover:underline leading-4">
                {author?.name}
              </span>
              <span className="text-sm text-muted-foreground leading-4">
                {"@" + author?.username}
              </span>
            </Link>
          </div>
          <MoreHorizontal className="h-7 w-7 rounded-full p-1 hover:bg-muted" />
        </div>
        <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
          {content}
        </pre>
        {images?.length > 0 && (
          <div className="flex gap-x-2 pb-2">
            {images?.map((imgUrl) => (
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
        <div className="pb-2 text-[13px] text-muted-foreground">
          {format(created, "hh:mm aa · MMM dd,yyyy")}
        </div>
        <ReactionStrip
          key={id}
          threadId={id}
          userId={userId}
          likes={likes}
          replies={replies}
        />
      </div>
    </article>
  )
}
export default ThreadCard
