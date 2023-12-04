import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { format } from "date-fns"
import MidSection from "@/app/(main)/profile/[authorId]/MidSection"
import ThreadsTab from "@/app/(main)/profile/[authorId]/ThreadsTab"
import RepliesTab from "@/app/(main)/profile/[authorId]/RepliesTab"
import RepostsTab from "@/app/(main)/profile/[authorId]/RepostsTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { getUser, getUserByAuthorId } from "@/lib/actions/user.actions"
import { Briefcase, CalendarDays, LinkIcon } from "lucide-react"

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
  ) ? true : false
  const { posts, replies, reposts } = await getPostsByAuthorId(authorId)
  return (
    <>
      <section className="p-4">
        <div className="flex justify-between">
          <div className="w-full">
            <h4 className="text-xl font-bold leading-6">{author.name}</h4>
            <h4 className="text-base leading-5 text-muted-foreground">
              {"@" + author.username}
            </h4>
            <p className="pt-2 text-sm">{author.bio}</p>
          </div>
          <div className="w-32">
            <Image
              src={author?.profilePhoto}
              alt="author-pic"
              height={96}
              width={96}
              quality={100}
              className="h-24 w-24 rounded-full"
            />
          </div>
        </div>
        <div className="pt-1 text-sm">
          <Link
            href={`/profile/${authorId}/following`}
            className="hover:underline">
            {`${author?.followings?.length} Following`}
          </Link>
          <Link
            href={`/profile/${authorId}/followers`}
            className="pl-2 hover:underline">
            {`${author?.followers?.length} ${
              author?.followers?.length > 1 ? "Followers" : "Follower"
            }`}
          </Link>
        </div>
        <div className="flex flex-wrap gap-x-4 py-2">
          {author?.userLabel && (
            <span className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 pr-1" />
              {author?.userLabel}
            </span>
          )}
          {author?.link && (
            <span className="flex max-w-[14rem] items-center truncate text-sm">
              <LinkIcon className="h-4 w-4 pr-1" />
              <Link
                href={author.link}
                target="_blank"
                rel="nofollow"
                className="contents text-blue-400">
                {author?.link}
              </Link>
            </span>
          )}
          <span
            className="flex items-center text-sm"
            title={`${format(author.created, "dd MMM yyyy, hh:mm")}`}>
            <CalendarDays className="h-4 w-4 pr-1" />
            {`Joined ${format(author.created, "MMM yyyy")}`}
          </span>
        </div>
        <MidSection userId={userId} authorId={authorId} status={isFollowing} />
        <Tabs defaultValue="posts" className="mt-4 w-full">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="replies">Replies</TabsTrigger>
            <TabsTrigger value="reposts">Reposts</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <ThreadsTab
              posts={posts}
              userInfo={JSON.parse(JSON.stringify(userInfo))}
            />
          </TabsContent>
          <TabsContent value="replies">
            <RepliesTab
              replies={replies}
              userInfo={JSON.parse(JSON.stringify(userInfo))}
            />
          </TabsContent>
          <TabsContent value="reposts">
            <RepostsTab
              reposts={reposts.reposts}
              userInfo={JSON.parse(JSON.stringify(userInfo))}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
export default ProfilePage
