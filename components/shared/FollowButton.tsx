"use client"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { followPostAuthor, unfollowPostAuthor } from "@/lib/actions/user.actions"
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
  const handleAction = async () => {
    if (status) unfollowPostAuthor(authorId, userId, pathname)
    else followPostAuthor(authorId, userId, pathname)
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
