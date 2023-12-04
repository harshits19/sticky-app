import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProfileCard from "@/components/cards/ProfileCard"
import { getFollowersByAuthorId } from "@/lib/actions/thread.actions"
import { getUser, getUserByAuthorId } from "@/lib/actions/user.actions"
import { ProfileCardProps } from "@/types"

const FollowersPage = async ({
  params: { authorId, follow },
}: {
  params: { authorId: string; follow: string }
}) => {
  const author = await getUserByAuthorId(authorId)
  const userInfo = await getUser()
  const data = await getFollowersByAuthorId(authorId)
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
          data?.followers?.map((follower: ProfileCardProps) => (
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
          data?.followings?.map((following: ProfileCardProps) => (
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
