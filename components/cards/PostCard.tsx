import Image from "next/image"
import Link from "next/link"
interface PostProps {
  content: string
  id: string
  created: Date
  updated: Date
  images: string[]
  author: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
  parentId?: string | null
}
const PostCard = ({
  content,
  id,
  created,
  updated,
  images,
  author,
  parentId,
}: PostProps) => {
  return (
    <article className="">
      <Link href={`/profile/${author._id.toString()}`}>
        <p>{author.name}</p>
      </Link>
      <p>{author.username}</p>
      <Image
        src={author?.profilePhoto}
        alt="author-pic"
        height={48}
        width={48}
        className="h-12 w-12 rounded-full"
      />
      <Link href={`/thread/${id}`}>
        <div>{content}</div>
      </Link>
      <p>{created?.toLocaleString()}</p>
      <div className="flex space-x-2">
        {images?.length > 0 &&
          images?.map((imgUrl) => (
            <div className="relative h-64 w-full" key={imgUrl}>
              <Image src={imgUrl} alt="post-image" fill />
            </div>
          ))}
      </div>
    </article>
  )
}
export default PostCard
