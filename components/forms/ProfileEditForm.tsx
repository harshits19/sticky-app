"use client"
import * as z from "zod"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import UploadImageModal from "../modals/UploadImageModal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserValidation } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUser } from "@/lib/actions/user.actions"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { Plus } from "lucide-react"

type FormValues = {
  id: string
  name: string
  username: string
  profilePhoto: string
  bio: string
  link?: string
  userLabel?: string
  visibility?: boolean
}

const ProfileEditForm = ({
  user,
  btnTitle,
  editForm,
}: {
  user: FormValues
  btnTitle: string
  editForm?: boolean
}) => {
  const { onOpen } = useProfilePhoto()
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      name: user.name,
      username: user.username,
      profilePhoto: user.profilePhoto,
      bio: user.bio,
      link: user.link,
      userLabel: user.userLabel,
      visibility: user.visibility,
    },
  })
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    try {
      await updateUser({
        userId: user.id,
        path: pathname,
        name: values.name,
        username: values.username,
        profilePhoto: user.profilePhoto,
        bio: values.bio,
        link: values.link,
        userLabel: values.userLabel,
        visibility: values.visibility,
      })
      toast.success(
        `Profile ${pathname === "/onboarding" ? "created!" : "updated!"}`,
      )
      if (pathname === "/profile/edit") {
        router.back()
      } else {
        router.push("/")
      }
    } catch (err: any) {
      toast.error(
        `Failed to ${
          pathname === "/onboarding" ? "create" : "update"
        } profile. \n Error: ${err.message}`,
      )
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex w-full max-w-sm items-end space-x-2">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="relative cursor-pointer" onClick={onOpen}>
            <Image
              src={user.profilePhoto}
              height={40}
              width={40}
              alt="profile-photo"
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 rounded-full bg-black">
              <Plus className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Input placeholder="bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {editForm && (
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="link" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {editForm && (
          <FormField
            control={form.control}
            name="userLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="category" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {editForm && (
          <FormField
            control={form.control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Visibility</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-1">
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={true} />
                      </FormControl>
                      <FormLabel className="font-normal">Public</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={false} />
                      </FormControl>
                      <FormLabel className="font-normal">Private</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div>
          <Button type="submit" className="mt-2 w-full">
            {btnTitle}
          </Button>
        </div>
      </form>
      <UploadImageModal userId={user.id} profilePic />
    </Form>
  )
}
export default ProfileEditForm
