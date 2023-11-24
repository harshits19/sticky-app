import { Button } from "@/components/ui/button"
import { getPostsByAuthorId } from "@/lib/actions/thread.actions"
import { getUserByAuthorId } from "@/lib/actions/user.actions"
import { format } from "date-fns"
import { CalendarDays, Link2, LinkIcon } from "lucide-react"
import mongoose from "mongoose"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: {
    authorId: string
  }
}
const ProfilePage = async ({ params: { authorId } }: Props) => {
  const author = await getUserByAuthorId(authorId)
  const formatAuthorId = new mongoose.Types.ObjectId(authorId)
  const posts = await getPostsByAuthorId(formatAuthorId)
  // console.log(author)
  /* const threads = posts.filter(
    (post) => post.parentId === undefined || post.parentId === null,
  ) */
  // console.log(threads)

  return (
    <section className="p-4">
      <div className="flex justify-between">
        <div className="w-full">
          <h4 className="text-xl font-bold">{author.name}</h4>
          <h4 className="text-base">{author.username}</h4>
          <p className="pt-4 text-sm">{author.bio}</p>
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
      <span className="text-sm">
        <b>X</b> Following
      </span>
      <span className="text-sm">
        <b>X</b> Followers
      </span>
      <div className="flex gap-x-4 py-2">
        <span
          className="flex items-center text-sm"
          title={`${format(author.created, "dd MMM yyyy, hh:mm")}`}>
          <CalendarDays className="h-4 w-4 pr-1" />
          {`Joined ${format(author.created, "MMM yyyy")}`}
        </span>
        {author?.link && (
          <span className="flex items-center text-sm text-muted-foreground">
            <LinkIcon className="h-4 w-4 pr-1" />
            {author?.link}
          </span>
        )}
      </div>
      <Button className="mt-2 w-full" size="sm" variant="outline" asChild>
        <Link href={`/profile/edit`}>Edit Profile</Link>
      </Button>
    </section>
  )
}
export default ProfilePage
