import Link from "next/link"
import ProfileCard from "@/components/cards/ProfileCard"
import { getAllUsers, getUser } from "@/lib/actions/user.actions"
import { ProfileCardProps } from "@/types"
import { currentUser } from "@clerk/nextjs"

const RightSidebar = async () => {
  const user = await currentUser()
  if (!user) return
  const userInfo = await getUser()
  const { users } = await getAllUsers(userInfo?._id, "", 1, 5)
  return (
    <main className="sticky top-0 hidden h-screen w-full max-w-xs border-l border-muted p-4 lg:flex">
      {!!users.length && (
        <div className="h-max w-full rounded-lg bg-muted">
          <h2 className="px-4 py-2 text-xl font-bold">Who to follow</h2>
          {users?.map((user: ProfileCardProps) => (
            <ProfileCard
              data={user}
              key={user?._id}
              userId={userInfo?._id}
              className="hover:bg-muted-foreground/10"
              asChild
            />
          ))}
          <Link href="/search">
            <p className="rounded-b-lg px-4 py-3 text-sm text-primary/80 hover:bg-muted-foreground/10">
              Show more
            </p>
          </Link>
        </div>
      )}
    </main>
  )
}
export default RightSidebar
