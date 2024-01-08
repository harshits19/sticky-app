"use client"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import ReactionStrip from "@/components/shared/ReactionStrip"
import ImageContainer from "@/components/shared/ImageContainer"
import CardMenu from "@/components/shared/CardMenu"
import { Thread } from "@/types"

interface ThreadCardProps {
  post: Thread
  userId: string
  reposts: string[]
}

const ThreadCard = ({ post, userId, reposts }: ThreadCardProps) => {
  const { authorId, children, text, created, _id, postImages, likes } = post

  return (
    <article className="flex border-y border-muted p-4">
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
          <div className="flex flex-col">
            <Link
              href={`/profile/${authorId?._id}`}
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
          <CardMenu authorId={authorId?._id} postId={_id} userId={userId} />
        </div>
        <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
          {text}
        </pre>
        <ImageContainer images={postImages} removeImg={() => {}} />
        <div className="pb-2 text-[13px] text-muted-foreground">
          {created && format(new Date(created), "hh:mm aa · MMM dd,yyyy")}
        </div>
        <ReactionStrip
          key={_id}
          threadId={_id}
          userId={userId}
          likes={likes}
          replies={children.length}
          reposts={reposts}
        />
      </div>
    </article>
  )
}
export default ThreadCard
