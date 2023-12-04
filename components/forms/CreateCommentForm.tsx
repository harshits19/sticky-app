"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import IconPicker from "@/components/modals/IconPicker"
import UploadImageModal from "@/components/modals/UploadImageModal"
import { Textarea } from "@/components/ui/textarea"
import ImageContainer from "@/components/shared/ImageContainer"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { createComment } from "@/lib/actions/thread.actions"
import { ImageIcon, Smile } from "lucide-react"

const CreateCommentForm = ({
  parentId,
  userId,
}: {
  parentId: string
  userId: string
}) => {
  const [value, setValue] = useState("")
  const { onOpen, imageStore, clearImgStore } = useProfilePhoto()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await createComment({
        userId,
        parentId,
        content: value,
        postImg: imageStore,
        path: `/thread/${parentId}`,
      })
    } catch (err) {
      console.log(err)
    }
    clearImgStore()
    setValue("")
  }
  const onEmojiSelect = (emoji: string) => {
    setValue((prevVal) => prevVal + emoji)
  }
  return (
    <div className="w-full">
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <Textarea
          placeholder="post your reply.."
          className="no-focus h-16 resize-none border-none text-base"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <ImageContainer images={imageStore} />
        <div className="flex items-center justify-between border-t border-muted px-4 py-2">
          <div className="flex items-center">
            <div
              onClick={onOpen}
              className="cursor-pointer rounded-full p-1 hover:bg-muted">
              <ImageIcon className="h-7 w-7 p-1" />
            </div>
            <IconPicker asChild onChange={onEmojiSelect}>
              <div className="cursor-pointer rounded-full p-1 hover:bg-muted">
                <Smile className="h-7 w-7 p-1" />
              </div>
            </IconPicker>
          </div>
          <Button type="submit" className="rounded-full" size="sm">
            Reply
          </Button>
        </div>
      </form>
      <UploadImageModal />
    </div>
  )
}
export default CreateCommentForm
