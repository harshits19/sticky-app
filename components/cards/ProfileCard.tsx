import Image from "next/image"
import Link from "next/link"
import FollowButton from "@/components/shared/FollowButton"
import { ProfileCardProps } from "@/types"
import { cn } from "@/lib/utils"

const ProfileCard = ({
  data,
  userId,
  asChild,
  className,
}: {
  data: ProfileCardProps
  userId: string
  asChild?: boolean
  className?: string
}) => {
  const isFollowing = data?.followers?.find(
    (author: string) => author === userId,
  )
    ? true
    : false
  return (
    <div
      className={cn(
        "flex p-4 transition-colors duration-200 hover:bg-muted",
        className,
      )}>
      <Link href={`/profile/${data._id}`} className="contents">
        <div className="min-w-[3rem]">
          <Image
            src={data?.profilePhoto}
            alt="data-pic"
            height={36}
            width={36}
            quality={100}
            className="h-9 w-9 rounded-full"
          />
        </div>
      </Link>
      <div className="flex w-full flex-col">
        <Link href={`/profile/${data._id}`} className="contents">
          <h4 className="text-base font-bold leading-5">{data.name}</h4>
          <h4 className="text-sm leading-4 text-muted-foreground">
            {"@" + data.username}
          </h4>
        </Link>
        {!asChild && <p className="pt-1 text-sm">{data.bio}</p>}
      </div>
      {data._id !== userId && (
        <FollowButton
          authorId={data?._id}
          userId={userId}
          status={isFollowing}
          className={asChild ? "h-8 rounded-full px-3" : "rounded-full"}
        />
      )}
    </div>
  )
}
export default ProfileCard
