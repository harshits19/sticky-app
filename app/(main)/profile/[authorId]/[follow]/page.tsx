import { getFollowersByAuthor } from "@/lib/actions/thread.actions"
import { getUser, getUserByAuthorId } from "@/lib/actions/user.actions"
import { currentUser } from "@clerk/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileCard from "@/components/cards/ProfileCard"

const FollowersPage = async ({
  params: { authorId, follow },
}: {
  params: { authorId: string; follow: string }
}) => {
  const user = await currentUser()
  const author = await getUserByAuthorId(authorId)
  if (!user) return null
  const userInfo = await getUser(user.id) //to match follow button
  const data = await getFollowersByAuthor({ authorId })
  return (
    <Tabs defaultValue={follow} className="mt-2 w-full">
      <TabsList>
        <TabsTrigger value="followers">Followers</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="followers">
        {data?.followers?.length === 0 ? (
          <div className="px-4 pt-6 text-center">
            <p className="text-2xl font-bold">{`Looking for followers?`}</p>
            <p className="">
              When someone follows this account, they’ll show up here.
            </p>
          </div>
        ) : (
          data?.followers?.map((follower: any) => (
            <ProfileCard
              key={follower?._id}
              data={follower}
              userId={userInfo._id.toString()}
            />
          ))
        )}
      </TabsContent>
      <TabsContent value="following">
        {data?.followings?.length === 0 ? (
          <div className="px-4 pt-6 text-center">
            <p className="text-2xl font-bold">{`@${author.username} isn’t following anyone`}</p>
            <p className="">Once they follow accounts, they’ll show up here.</p>
          </div>
        ) : (
          data?.followings?.map((following: any) => (
            <ProfileCard
              key={following?._id}
              data={following}
              userId={userInfo._id.toString()}
            />
          ))
        )}
      </TabsContent>
    </Tabs>
  )
}
export default FollowersPage
