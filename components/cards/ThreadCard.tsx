import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import ReactionStrip from "@/components/shared/ReactionStrip"
import ImageContainer from "../shared/ImageContainer"
import { PostCardProps } from "@/types"

const ThreadCard = ({
  text,
  _id,
  created,
  postImages,
  authorId,
  likes,
  replies,
  userId,
  reposts,
}: PostCardProps) => {
  return (
    <article className="flex border-y border-muted p-4">
      <div className="h-full w-14">
        <Link
          href={`/profile/${authorId._id}`}
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
          <div className="flex flex-col">
            <Link
              href={`/profile/${authorId?._id.toString()}`}
              scroll={false}
              className="contents">
              <span className="text-sm font-bold leading-4 hover:underline">
                {authorId?.name}
              </span>
              <span className="text-sm leading-4 text-muted-foreground">
                {"@" + authorId?.username}
              </span>
            </Link>
          </div>
          <MoreHorizontal className="h-7 w-7 rounded-full p-1 hover:bg-muted" />
        </div>
        <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
          {text}
        </pre>
        <ImageContainer images={postImages} />
        <div className="pb-2 text-[13px] text-muted-foreground">
          {format(created, "hh:mm aa · MMM dd,yyyy")}
        </div>
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
export default ThreadCard
