import Image from "next/image"
interface PostProps {
  content: string
  created: Date
  updated: Date
  images: string[]
  author: {
    name: string
    username: string
    _id: string
    profilePhoto: string
  }
}
const PostCard = ({ content, created, updated, images, author }: PostProps) => {
  return (
    <article className="">
      <p>{author.name}</p>
      <p>{author.username}</p>
      <Image
        src={author.profilePhoto}
        alt="author-pic"
        height={48}
        width={48}
        className="rounded-full"
      />
      <div>{content}</div>
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
