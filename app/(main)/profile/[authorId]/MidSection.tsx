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
        <FollowButton
          authorId={authorId}
          userId={userId}
          status={status}
          className={"mt-2 w-full"}
        />
      )}
    </>
  )
}
export default MidSection
