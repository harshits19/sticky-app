import type { Metadata } from "next"
import MidSection from "@/app/(main)/profile/[authorId]/MidSection"
import TopSection from "@/app/(main)/profile/[authorId]//TopSection"
import ThreadsTab from "@/app/(main)/profile/[authorId]/ThreadsTab"
import RepliesTab from "@/app/(main)/profile/[authorId]/RepliesTab"
import RepostsTab from "@/app/(main)/profile/[authorId]/RepostsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getUser, getUserByAuthorId } from "@/lib/actions/user.actions"

type Props = {
  params: {
    authorId: string
  }
}
export async function generateMetadata({
  params: { authorId },
}: Props): Promise<Metadata> {
  const author = await getUserByAuthorId(authorId)
  return { title: `${author?.name} (@${author?.username})` }
}

const ProfilePage = async ({ params: { authorId } }: Props) => {
  const author = await getUserByAuthorId(authorId)
  const userInfo = await getUser()
  const userId = userInfo._id.toString()
  const isFollowing = author.followers.find(
    (author: string) => author === userId,
  )
    ? true
    : false
  const isFollowed = author.followings.find(
    (author: string) => author === userId,
  )
    ? true
    : false
  return (
    <section>
      <TopSection author={author} authorId={authorId} isFollowed={isFollowed} />
      <MidSection userId={userId} authorId={authorId} status={isFollowing} />
      <Tabs defaultValue="posts" className="w-full">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="replies">Replies</TabsTrigger>
          <TabsTrigger value="reposts">Reposts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <ThreadsTab
            authorId={authorId}
            userInfo={userInfo}
            authorName={author.username}
          />
        </TabsContent>
        <TabsContent value="replies">
          <RepliesTab
            authorId={authorId}
            userInfo={userInfo}
            authorName={author.username}
          />
        </TabsContent>
        <TabsContent value="reposts">
          <RepostsTab
            authorId={authorId}
            userInfo={userInfo}
            authorName={author.username}
          />
        </TabsContent>
      </Tabs>
    </section>
  )
}
export default ProfilePage
