"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import UploadImageModal from "@/components/modals/UploadImageModal"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageContainer from "@/components/shared/ImageContainer"
import IconPicker from "@/components/modals/IconPicker"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { createThread } from "@/lib/actions/thread.actions"
import { ImageIcon, Smile } from "lucide-react"

const CreatePostForm = ({ userId }: { userId: string }) => {
  const [value, setValue] = useState("")
  const { onOpen, imageStore, clearImgStore } = useProfilePhoto()
  const router = useRouter()

  const onSubmit = async (e: any) => {
    e.preventDefault()
    try {
      await createThread({
        userId,
        content: value,
        postImg: imageStore,
        path: "/create-post",
      })
    } catch (err) {
      console.log(err)
    }
    clearImgStore()
    setValue("")
    router.push("/")
  }
  const onEmojiSelect = (emoji: string) => {
    setValue((prevVal) => prevVal + emoji)
  }

  return (
    <div className="w-full">
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <Textarea
          placeholder="Write a post..."
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
            Post
          </Button>
        </div>
      </form>
      <UploadImageModal />
    </div>
  )
}
export default CreatePostForm
