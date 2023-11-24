import { calculateTimeDifference } from "@/hooks/useDateDistance"
import { format } from "date-fns"
import { MoreHorizontal } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PostProps {
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
const PostCard = ({
  content,
  id,
  created,
  updated,
  images,
  author,
  parentId,
}: PostProps) => {
  return (
    <article className="my-1 flex py-4">
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
          <div className="flex items-start gap-x-1">
            <Link
              href={`/profile/${author?._id.toString()}`}
              className="contents">
              <span className="text-sm font-semibold hover:underline">
                {author?.name}
              </span>
              <span className="text-sm text-muted-foreground">
                {"@" + author?.username}
              </span>
            </Link>
          </div>
          <div className="flex">
            <p
              className="pr-2 text-sm text-muted-foreground/75"
              title={format(created, "dd MMM yyyy hh:mm")}>
              {calculateTimeDifference(created)}
            </p>
            <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted" />
          </div>
        </div>

        <div className="pb-2 text-base leading-none">
          <Link href={`/thread/${id}`} className="contents">
            {content}
          </Link>
        </div>
        <div className="flex space-x-2">
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
        <div>Reactions</div>
      </div>
    </article>
  )
}
export default PostCard
