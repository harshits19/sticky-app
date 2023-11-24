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
const CommentCard = () => {
  return (
    <div>CommentCard</div>
  )
}
export default CommentCard