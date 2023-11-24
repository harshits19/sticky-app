import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
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
  parentId?: string | null
}
const ThreadCard = ({
  content,
  id,
  created,
  updated,
  images,
  author,
  parentId,
}: ThreadProps) => {
  return (
    <article className="flex border-y border-muted p-4">
      <div className="h-full w-14">
        <Link href={`/profile/${author._id}`} className="contents">
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
          <Link href={`/profile/${author._id}`}>
            <p className="text-sm font-semibold hover:underline">
              {author?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {"@" + author?.username}
            </p>
          </Link>
          <div className="flex">
            <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted" />
          </div>
        </div>
        <pre className="py-2 font-sans text-base leading-none">
          <Link href={`/thread/${id}`} className="contents">
            {content}
          </Link>
        </pre>
        <div className="flex gap-x-2">
          {images?.length > 0 &&
            images?.map((imgUrl) => (
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
        <div className="pb-2 text-sm text-muted-foreground">
          {format(created, "hh:mm aa · MMM dd,yyyy")}
        </div>
        <div>Reactions</div>
      </div>
    </article>
  )
}
export default ThreadCard
