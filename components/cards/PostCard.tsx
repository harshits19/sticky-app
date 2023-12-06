"use client"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import ImageContainer from "@/components/shared/ImageContainer"
import ReactionStrip from "@/components/shared/ReactionStrip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
  const router = useRouter()
  return (
    <article
      className="flex cursor-pointer border-b border-muted p-4 transition-colors duration-200 hover:bg-muted"
      onClick={() => {
        router.push(`/thread/${_id}`)
      }}>
      <div className="h-full w-14">
        <Link
          href={`/profile/${authorId?._id}`}
          scroll={false}
          className="contents"
          onClick={(e) => e.stopPropagation()}>
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
          <div className="flex flex-wrap items-start gap-x-1">
            <Link
              href={`/profile/${authorId?._id}`}
              onClick={(e) => e.stopPropagation()}
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
              title={format(new Date(created), "dd MMM yyyy hh:mm")}>
              {calculateTimeDifference(created)}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
              <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted-foreground/20" />
            </DropdownMenuTrigger>
            <DropdownMenuContent forceMount align="end">
              <Link
                href={`/profile/${authorId?._id}`}
                onClick={(e) => e.stopPropagation()}
                scroll={false}
                className="contents">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              {authorId._id === userId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <pre className="whitespace-pre-wrap py-2 font-sans text-base leading-5">
          {text}
        </pre>
        <ImageContainer images={postImages} removeImg={() => {}} />
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
