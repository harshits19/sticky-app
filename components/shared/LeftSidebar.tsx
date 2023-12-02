"use client"
import { usePathname, useRouter } from "next/navigation"
import { HomeIcon, SearchIcon, CreateIcon, HeartIcon, UserIcon } from "./Icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"

interface SidebarProps {
  userId: string
  username: string
  name: string
  imageURL: string
}
const LeftSidebar = ({ userId, username, name, imageURL }: SidebarProps) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className="sticky top-0 hidden h-screen lg:flex-1 lg:w-full lg:max-w-xs flex-col justify-between border-r-[1px] border-muted bg-background px-1 pb-8 pt-2 sm:flex lg:pl-4">
      <div className="flex flex-col items-center lg:items-start">
        <div className="mb-4 flex items-center gap-1 px-4">
          <Link href="/" className="contents">
            <Image src="/logo144.png" alt="logo" height={36} width={36} />
            <p className="hidden text-lg font-semibold lg:block">Sticky</p>
          </Link>
        </div>
        <Link href="/" className="contents">
          <div className="flex w-max items-center gap-x-4  rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <HomeIcon
              className={`${
                pathname === "/" ? "fill-current" : "fill-transparent"
              }`}
            />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/" && "font-bold"
              }`}>
              Home
            </span>
          </div>
        </Link>
        <Link href="/search" className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <SearchIcon />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/search" && "font-bold"
              }`}>
              Search
            </span>
          </div>
        </Link>
        <Link href="/create-post" className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <CreateIcon />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/create-post" && "font-bold"
              }`}>
              Create Post
            </span>
          </div>
        </Link>
        <Link href="/notifications" className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <HeartIcon
              className={`${
                pathname === "/notifications"
                  ? "fill-current"
                  : "fill-transparent"
              }`}
            />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === "/notifications" && "font-bold"
              }`}>
              Notifications
            </span>
          </div>
        </Link>
        <Link href={`/profile/${userId}`} className="contents">
          <div className="flex w-max items-center gap-x-4 rounded-full px-4 py-3 hover:bg-muted lg:px-6">
            <UserIcon
              className={`${
                pathname === `/profile/${userId}`
                  ? "fill-current"
                  : "fill-transparent"
              }`}
            />
            <span
              className={`hidden text-lg text-primary lg:flex ${
                pathname === `/profile/${userId}` && "font-bold"
              }`}>
              Profile
            </span>
          </div>
        </Link>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            className="flex w-full items-center justify-center rounded-full px-3 py-3 hover:bg-muted lg:px-6 max-w-[264px]">
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
          <DropdownMenuItem className="w-full">
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              Logout
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  )
}
export default LeftSidebar
