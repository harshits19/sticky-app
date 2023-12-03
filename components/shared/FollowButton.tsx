"use client"
import { Button } from "@/components/ui/button"
import { followUser, unfollowUser } from "@/lib/actions/user.actions"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

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
  const handleAction = async () => {
    if (status) unfollowUser(authorId, userId, pathname)
    else followUser(authorId, userId, pathname)
  }
  return (
    <Button
      className={cn(className)}
      size="sm"
      onClick={handleAction}
      variant={status ? "outline" : "default"}>
      {status ? "Unfollow" : "Follow"}
    </Button>
  )
}
export default FollowButton
