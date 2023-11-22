"use client"
import * as z from "zod"
import Image from "next/image"
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

type FormValues = {}

const CreatePostForm = ({ authorId }: { authorId: string }) => {
  const { onOpen, imageStore } = useProfilePhoto()
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
        path: "/create-post"
      })
    } catch (err) {
      console.log(err)
    }
    router.push("/")
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Create"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div onClick={onOpen}>
            <ImageIcon className="m-2 h-6 w-6 rounded-sm bg-muted-foreground/10" />
          </div>
          <div className="flex w-full space-x-2">
            {imageStore?.length > 0 &&
              imageStore?.map((imgUrl) => (
                <div className="relative h-64 w-full" key={imgUrl}>
                  <Image src={imgUrl} alt="post-image" fill sizes="(max-width: 1200px) 50%, 33%"/>
                </div>
              ))}
          </div>
          <Button type="submit" className="mt-2 w-full">
            Post
          </Button>
        </div>
      </form>
      <UploadImageModal />
    </Form>
  )
}
export default CreatePostForm
