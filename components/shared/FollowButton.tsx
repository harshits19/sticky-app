"use client"
import { useOptimistic } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  followPostAuthor,
  unfollowPostAuthor,
} from "@/lib/actions/user.actions"
import { cn } from "@/lib/utils"

const FollowButton = ({
  userId,
  authorId,
  status,
  className,
}: {
  userId: string
  authorId: string
  status?: boolean
  className?: string
}) => {
  const pathname = usePathname()
  const [followStatus, setFollowStatus] = useOptimistic(status)
  const handleAction = async () => {
    if (followStatus) {
      setFollowStatus(false)
      unfollowPostAuthor(authorId, userId, pathname)
    } else {
      setFollowStatus(true)
      followPostAuthor(authorId, userId, pathname)
    }
  }
  return (
    <Button
      className={cn(className)}
      size="sm"
      onClick={handleAction}
      variant={followStatus ? "outline" : "default"}>
      {followStatus ? "Unfollow" : "Follow"}
    </Button>
  )
}
export default FollowButton
