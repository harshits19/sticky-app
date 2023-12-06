import Link from "next/link"
import ProfileCard from "@/components/cards/ProfileCard"
import { getAllUsers } from "@/lib/actions/user.actions"
import { ProfileCardProps } from "@/types"

const RightSidebar = async ({ userId }: { userId: string }) => {
  const { users } = await getAllUsers(userId, "", 1, 5)
  return (
    <main className="sticky top-0 hidden h-screen w-full max-w-xs border-l border-muted p-4 lg:flex">
      {!!users.length && (
        <div className="h-max w-full rounded-lg bg-muted">
          <h2 className="px-4 py-2 text-xl font-bold">Who to follow</h2>
          {users?.map((user: ProfileCardProps) => (
            <ProfileCard
              data={user}
              key={user._id}
              userId={userId}
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
