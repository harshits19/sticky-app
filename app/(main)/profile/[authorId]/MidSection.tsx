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
    <>
      {userId === authorId && (
        <Button className="mt-2 w-full" size="sm" variant="outline" asChild>
          <Link href={`/profile/edit`}>Edit Profile</Link>
        </Button>
      )}
      {userId !== authorId && (
        <div className="flex gap-x-2 items-center mt-2">
          <FollowButton
            authorId={authorId}
            userId={userId}
            status={status}
            className={"w-full"}
          />
          <Button variant="outline" size="sm" className="w-full">Mention</Button>
        </div>
      )}
    </>
  )
}
export default MidSection
