"use client"
import { ChangeEventHandler, useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import IconPicker from "@/components/modals/IconPicker"
import { Textarea } from "@/components/ui/textarea"
import ImageContainer from "@/components/shared/ImageContainer"
import { createComment } from "@/lib/actions/thread.actions"
import { useEdgeStore } from "@/lib/edgestore"
import { ImageIcon, Smile } from "lucide-react"

const CreateCommentForm = ({
  parentId,
  userId,
}: {
  parentId: string
  userId: string
}) => {
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [store, setStore] = useState<string[]>([])
  const { edgestore } = useEdgeStore()

  const removeImg = async (url: string) => {
    try {
      await edgestore.publicFiles.delete({
        url,
      })
      const newStore = store.filter((imgUrl) => imgUrl !== url)
      setStore([...newStore])
    } catch (err) {
      toast.error("Error deleting image.")
    }
  }
  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const fileInp = e.target.files?.[0]
      if (!fileInp) return
      setIsSubmitting(true)
      const res = await edgestore.publicFiles.upload({
        file: fileInp,
      })
      setStore([...store, res.url])
    } catch (err) {
      toast.error(
        "Error uploading image. The file size may be too large, or you have chosen an unsupported file format.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const onSubmit = async (e: any) => {
    setIsSubmitting(true)
    e.preventDefault()
    try {
      await createComment({
        userId,
        parentId,
        content: value,
        postImg: store,
        path: `/thread/${parentId}`,
      })
    } catch (err) {
      console.log(err)
    }
    setValue("")
    setStore([])
    setIsSubmitting(false)
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
        <ImageContainer images={store} removeImg={removeImg} isForm />
        <div className="flex items-center justify-between border-t border-muted px-4 py-2">
          <div className="flex items-center">
            {store?.length < 2 && (
              <label
                htmlFor="fileInput"
                className="cursor-pointer rounded-full p-1 hover:bg-muted">
                <ImageIcon className="h-7 w-7 p-1" />
              </label>
            )}
            <input
              type="file"
              onChange={onChange}
              accept="image/*"
              style={{ display: "none" }}
              id="fileInput"
              disabled={isSubmitting}
            />
            <IconPicker asChild onChange={onEmojiSelect}>
              <div className="cursor-pointer rounded-full p-1 hover:bg-muted">
                <Smile className="h-7 w-7 p-1" />
              </div>
            </IconPicker>
          </div>
          <Button
            type="submit"
            className="rounded-full"
            size="sm"
            disabled={isSubmitting}>
            Reply
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CreateCommentForm
