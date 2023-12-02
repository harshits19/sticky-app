import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactionStrip from "@/components/shared/ReactionStrip"
import { PostProps } from "@/types"

const PostCard = ({
  content,
  id,
  created,
  updated,
  images,
  author,
  parentId,
  likes,
  replies,
  userId,
  comment,
}: PostProps) => {
  return (
    <article className="flex border-b border-muted p-4 transition-colors duration-200 hover:bg-muted">
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
          <div className="flex items-start gap-x-1">
            <Link
              href={`/profile/${author?._id.toString()}`}
              scroll={false}
              className="contents">
              <span className="text-sm font-bold hover:underline">
                {author?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {"@" + author?.username + " · "}
              </span>
            </Link>
            <p
              className="text-sm text-muted-foreground/75"
              title={format(created, "dd MMM yyyy hh:mm")}>
              {calculateTimeDifference(created)}
            </p>
          </div>
          <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted" />
        </div>
        <Link href={`/thread/${id}`} className="contents">
          <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
            {content}
          </pre>
        </Link>
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
export default PostCard
