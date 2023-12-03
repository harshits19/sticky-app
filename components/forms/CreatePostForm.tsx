"use client"
import * as z from "zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import UploadImageModal from "../modals/UploadImageModal"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { Textarea } from "../ui/textarea"
import { createThread } from "@/lib/actions/thread.actions"
import { ThreadValidation } from "@/lib/validations/thread"
import { ImageIcon } from "lucide-react"
import ImageContainer from "../shared/ImageContainer"

const CreatePostForm = ({ authorId }: { authorId: string }) => {
  const { onOpen, imageStore, clearImgStore } = useProfilePhoto()
  const router = useRouter()

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      authorId: "",
      content: "",
      postImg: [],
    },
  })
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      await createThread({
        authorId,
        content: values.content,
        postImg: imageStore,
        path: "/create-post",
      })
    } catch (err) {
      console.log(err)
    }
    clearImgStore()
    form.reset()
    router.push("/")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Write a post..."
                  className="no-focus h-16 resize-none border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <ImageContainer images={imageStore} />
        <div className="flex items-center justify-between border-t border-muted px-4 py-2">
          <div
            onClick={onOpen}
            className="cursor-pointer rounded-full p-1 hover:bg-muted">
            <ImageIcon className="h-7 w-7 p-1" />
          </div>
          <Button type="submit" className="rounded-full" size="sm">
            Post
          </Button>
        </div>
      </form>
      <UploadImageModal />
    </Form>
  )
}
export default CreatePostForm
