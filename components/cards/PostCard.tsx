import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import ImageContainer from "@/components/shared/ImageContainer"
import ReactionStrip from "@/components/shared/ReactionStrip"
import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { PostCardProps } from "@/types"
import { MoreHorizontal } from "lucide-react"

const PostCard = ({
  text,
  _id,
  created,
  postImages,
  authorId,
  likes,
  replies,
  userId,
  comment,
  reposts,
}: PostCardProps) => {
  return (
    <article className="flex border-b border-muted p-4 transition-colors duration-200 hover:bg-muted">
      <div className="h-full w-14">
        <Link
          href={`/profile/${authorId?._id}`}
          scroll={false}
          className="contents">
          <Image
            src={authorId?.profilePhoto}
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
              href={`/profile/${authorId?._id?.toString()}`}
              scroll={false}
              className="contents">
              <span className="text-sm font-bold hover:underline">
                {authorId?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {"@" + authorId?.username + " · "}
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
        <Link href={`/thread/${_id}`} className="contents">
          <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
            {text}
          </pre>
        </Link>
        <ImageContainer images={postImages} />
        <ReactionStrip
          key={_id}
          threadId={_id}
          userId={userId}
          likes={likes}
          replies={replies}
          reposts={reposts}
        />
      </div>
    </article>
  )
}
export default PostCard
