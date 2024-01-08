import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { Briefcase, CalendarDays, LinkIcon } from "lucide-react"
import { User } from "@/types"

const TopSection = ({
  author,
  authorId,
  isFollowed,
}: {
  author: User
  authorId: string
  isFollowed: boolean
}) => {
  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="w-full">
          <h4 className="text-xl font-bold leading-6">{author.name}</h4>
          <h4 className="flex items-center text-base leading-5 text-muted-foreground">
            {"@" + author.username}{" "}
            {isFollowed && (
              <span className="ml-1 rounded bg-muted p-0.5 text-xs text-primary/90">
                Follows you
              </span>
            )}
          </h4>
          <p className="pt-2 text-sm">{author.bio}</p>
        </div>
        <div className="w-32">
          <Image
            src={author?.profilePhoto!}
            alt="author-pic"
            height={96}
            width={96}
            quality={100}
            className="h-20 w-20 rounded-full sm:h-24 sm:w-24"
          />
        </div>
      </div>
      <div className="pt-1 text-sm">
        <Link
          href={`/profile/${authorId}/following`}
          className="hover:underline">
          {`${author?.followings?.length} Following`}
        </Link>
        <Link
          href={`/profile/${authorId}/followers`}
          className="pl-2 hover:underline">
          {`${author?.followers?.length} ${
            author?.followers?.length > 1 ? "Followers" : "Follower"
          }`}
        </Link>
      </div>
      <div className="flex flex-wrap gap-x-4 py-2">
        {author?.userLabel && (
          <span className="flex items-center text-sm">
            <Briefcase className="h-4 w-4 pr-1" />
            {author?.userLabel}
          </span>
        )}
        {author?.link && (
          <span className="flex max-w-[14rem] items-center truncate text-sm">
            <LinkIcon className="h-4 w-4 pr-1" />
            <Link
              href={author.link}
              target="_blank"
              rel="nofollow"
              className="contents text-blue-400">
              {author?.link}
            </Link>
          </span>
        )}
        <span
          className="flex items-center text-sm"
          title={`${format(new Date(author.created), "dd MMM yyyy, hh:mm")}`}>
          <CalendarDays className="h-4 w-4 pr-1" />
          {`Joined ${format(new Date(author.created), "MMM yyyy")}`}
        </span>
      </div>
    </div>
  )
}
export default TopSection
