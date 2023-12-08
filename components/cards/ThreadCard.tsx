"use client"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { format } from "date-fns"
import ReactionStrip from "@/components/shared/ReactionStrip"
import ImageContainer from "@/components/shared/ImageContainer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { deleteThread } from "@/lib/actions/thread.actions"
import { PostCardProps } from "@/types"
import { MoreHorizontal } from "lucide-react"

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
  const pathname = usePathname()
  const router = useRouter()
  const handleDelete = async (e:any) => {
    e.stopPropagation()
    const promise = deleteThread(_id, pathname)
    toast.promise(promise, {
      loading: "Deleting Post...",
      success: "Post deleted!",
      error: "Failed to delete post",
    })
    router.push("/")
  }

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
              {authorId?._id === userId && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
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
          replies={replies}
          reposts={reposts}
        />
      </div>
    </article>
  )
}
export default ThreadCard
