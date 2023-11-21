"use client"
import * as z from "zod"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { UserValidation } from "@/lib/validations/user"
import { zodResolver } from "@hookform/resolvers/zod"
import { updateUser } from "@/lib/actions/user.actions"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import ProfilePhotoModal from "../modals/ProfilePhotoModal"

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
}: {
  user: FormValues
  btnTitle: string
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
    },
  })
  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    const promise = updateUser({
      userId: user.id,
      path: pathname,
      name: values?.name,
      username: values?.username,
      profilePhoto: user.profilePhoto,
      bio: values?.bio,
    })
    toast.promise(promise, {
      loading: `${
        pathname === "/onboarding" ? "Creating" : "Updating"
      } Profile...`,
      success: `Profile ${
        pathname === "/onboarding" ? "created!" : "updated!"
      }`,
      error: `Failed to ${
        pathname === "/onboarding" ? "create" : "update"
      } profile.`,
    })
    if (pathname === "/profile/edit") {
      router.back()
    } else {
      router.push("/")
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
        <div>
          <Button type="submit" className="mt-2 w-full">
            {btnTitle}
          </Button>
        </div>
      </form>
      <ProfilePhotoModal userId={user.id} />
    </Form>
  )
}
export default ProfileEditForm
