"use client"
import { Button } from "@/components/ui/button"
import { followUser, unfollowUser } from "@/lib/actions/user.actions"
import Link from "next/link"
import { usePathname } from "next/navigation"
const MidSection = ({
  userId,
  authorId,
  status,
}: {
  userId: string
  authorId: string
  status: boolean
}) => {
  const pathname = usePathname()
  const handleAction = async () => {
    if (status) unfollowUser(authorId, userId, pathname)
    else followUser(authorId, userId, pathname)
  }
  return (
    <>
      {userId === authorId && (
        <Button className="mt-2 w-full" size="sm" variant="outline" asChild>
          <Link href={`/profile/edit`}>Edit Profile</Link>
        </Button>
      )}
      {userId !== authorId && (
        <Button
          className="mt-2 w-full"
          size="sm"
          onClick={handleAction}
          variant={status ? "outline" : "default"}>
          {status ? "Unfollow" : "Follow"}
        </Button>
      )}
    </>
  )
}
export default MidSection
