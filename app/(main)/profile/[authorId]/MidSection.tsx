"use client"
import FollowButton from "@/components/shared/FollowButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
const MidSection = ({
  userId,
  authorId,
  status,
}: {
  userId: string
  authorId: string
  status: boolean
}) => {
  return (
    <div className="p-4">
      {userId === authorId && (
        <Button className="mt-2 w-full" size="sm" variant="outline" asChild>
          <Link href={`/profile/edit`}>Edit Profile</Link>
        </Button>
      )}
      {userId !== authorId && (
        <div className="mt-2 flex items-center gap-x-2">
          <FollowButton
            authorId={authorId}
            userId={userId}
            status={status}
            className={"w-full"}
          />
          <Button variant="outline" size="sm" className="w-full">
            Mention
          </Button>
        </div>
      )}
    </div>
  )
}
export default MidSection
