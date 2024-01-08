"use client"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SignOutButton } from "@clerk/nextjs"
import { MoreHorizontal } from "lucide-react"

interface SidebarProps {
  userId: string
  username: string
  name: string
  imageURL: string
}
const LeftSidebarProfileBtn = ({
  userId,
  username,
  name,
  imageURL,
}: SidebarProps) => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role="button"
          className="flex w-full max-w-[264px] items-center justify-center rounded-full px-3 py-3 hover:bg-muted lg:px-6">
          <div className="h-10 w-12 lg:w-16">
            <Image
              src={imageURL}
              height={40}
              width={40}
              alt="profile-image"
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="hidden w-full flex-col lg:flex">
            <span className="text-sm font-semibold">{name}</span>
            <span className="text-sm text-muted-foreground">
              {"@" + username}
            </span>
          </div>
          <MoreHorizontal className="hidden h-5 w-5 lg:flex" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="center">
        <Link href={`/profile/${userId}`}>
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <SignOutButton
          signOutCallback={() => {
            router.push("/sign-in")
          }}>
          <DropdownMenuItem className="w-full">Logout</DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default LeftSidebarProfileBtn
