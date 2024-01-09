"use client"
import { ChangeEventHandler, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import ImageContainer from "@/components/shared/ImageContainer"
import IconPicker from "@/components/modals/IconPicker"
import ProgressCircle from "@/components/shared/ProgressCircle"
import { EmojiClickData } from "emoji-picker-react"
import useAutosizeTextArea from "@/hooks/useResizeTextarea"
import { createThread } from "@/lib/actions/thread.actions"
import { useEdgeStore } from "@/lib/edgestore"
import { ImageIcon, Smile } from "lucide-react"

const MAX_CHAR = 280

const CreatePostForm = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [store, setStore] = useState<string[]>([])
  const { edgestore } = useEdgeStore()
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  useAutosizeTextArea(textAreaRef.current, value)
  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value
    setValue(val)
  }

  const removeImg = async (url: string) => {
    try {
      const promise = edgestore.publicFiles.delete({
        url,
      })
      toast.promise(promise, {
        loading: "Removing image...",
        success: "Image removed!",
        error: "Failed to remove image",
      })
      const newStore = store.filter((imgUrl) => imgUrl !== url)
      setStore([...newStore])
    } catch (err) {
      toast.error("Error deleting image.")
    }
  }

  const onChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      toast.loading("Uploading Image...")
      setIsSubmitting(true)
      const fileInp = e.target.files?.[0]
      if (!fileInp) return
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
      const promise = createThread({
        userId,
        content: value,
        postImg: store,
        path: "/create-post",
      })
      toast.promise(promise, {
        loading: "Creating post...",
        success: "Post created!",
        error: "Failed to create Post",
      })
    } catch (err) {
      console.log(err)
    }
    setValue("")
    setStore([])
    setIsSubmitting(false)
    router.push("/")
  }
  const onEmojiSelect = (data: EmojiClickData) => {
    setValue((input) => {
      const arr = input.split("")
      const currentPos: number =
        textAreaRef.current?.selectionStart ?? arr.length
      arr.splice(currentPos, 0, data.emoji)
      const str = arr.join("")
      if (textAreaRef.current) {
        setTimeout(() => {
          textAreaRef.current?.setSelectionRange(
            currentPos + data.emoji.length,
            currentPos + data.emoji.length,
          )
        }, 0)
      }
      return str
    })
  }
  let progress = (value?.length / 280) * 100
  return (
    <div className="w-full">
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <Textarea
          placeholder="Write a post..."
          className="no-focus resize-y border-none text-base"
          value={value}
          onChange={handleChange}
          ref={textAreaRef}
          rows={2}
          maxLength={MAX_CHAR}
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
          <div className="flex items-center gap-x-4">
            {!!value.length ? <ProgressCircle progress={progress} /> : null}
            {!!value.length ? (
              <div className="h-7 w-px bg-muted-foreground/40"></div>
            ) : null}
            <Button
              type="submit"
              className="rounded-full"
              size="sm"
              disabled={isSubmitting}>
              Post
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default CreatePostForm
