"use client"
import * as z from "zod"
import Image from "next/image"
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
import { createComment } from "@/lib/actions/thread.actions"
import { ThreadValidation } from "@/lib/validations/thread"
import { ImageIcon } from "lucide-react"

const CreateCommentForm = ({
  parentId,
  authorId,
}: {
  parentId: string
  authorId: string
}) => {
  const { onOpen, imageStore, clearImgStore } = useProfilePhoto()

  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      authorId: "",
      parentId: "",
      content: "",
      postImg: [],
    },
  })
  const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
    try {
      await createComment({
        authorId,
        parentId,
        content: values.content,
        postImg: imageStore,
        path: `/thread/${parentId}`,
      })
      form.reset()
      clearImgStore()
    } catch (err) {
      console.log(err)
    }
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
                  placeholder="post your reply..."
                  className="no-focus h-12 resize-none border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between border-t border-muted px-4 py-2">
          <div
            onClick={onOpen}
            className="cursor-pointer rounded-full p-1 hover:bg-muted">
            <ImageIcon className="h-7 w-7 p-1" />
          </div>
          <Button type="submit" className="rounded-full" size="sm">
            Reply
          </Button>
        </div>
        <div className="flex w-full gap-x-2">
          {imageStore?.length > 0 &&
            imageStore?.map((imgUrl) => (
              <div className="relative h-64 w-full" key={imgUrl}>
                <Image
                  src={imgUrl}
                  alt="post-image"
                  fill
                  className="rounded-lg"
                  sizes="(max-width: 1200px) 50%, 33%"
                />
              </div>
            ))}
        </div>
      </form>
      <UploadImageModal />
    </Form>
  )
}
export default CreateCommentForm
