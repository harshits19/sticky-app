"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { SignOutButton } from "@clerk/nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatNum } from "@/hooks/useFormatNum"
import { ArrowLeft, MoreHorizontal } from "lucide-react"

const Navbar = ({
  authorId,
  postsNum = 0,
  authorName,
  username,
}: {
  authorId?: string
  postsNum?: number
  authorName?: string
  username?: string
}) => {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <nav className="sticky top-0 z-10 h-12 w-full border-b border-muted bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
        <div className="flex items-center">
          {pathname !== "/" ? (
            <div
              role="button"
              className="rounded-full p-1 outline-none hover:bg-muted"
              onClick={() => router.back()}>
              <ArrowLeft className="h-6 w-6 p-0.5" />
            </div>
          ) : (
            <p></p>
          )}
          {pathname.startsWith(`/thread/`) && (
            <span className="pl-4 text-lg font-semibold">Post</span>
          )}
          {pathname === "/notifications" && (
            <span className="pl-4 text-lg font-semibold">Notifications</span>
          )}
          {pathname.startsWith(`/profile/`) && (
            <div className="flex flex-col justify-center pl-4">
              <span className="text-lg font-bold leading-5">{authorName}</span>
              {pathname.startsWith(`/profile/${authorId}/follow`) ||
              pathname.startsWith(`/profile/edit`) ? (
                <span className="text-xs leading-4 text-muted-foreground/60">
                  {"@" + username}
                </span>
              ) : (
                <span className="text-xs leading-4 text-muted-foreground/60">{`${formatNum(
                  postsNum,
                )} ${postsNum > 1 ? "Posts" : "Post"}`}</span>
              )}
            </div>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full p-1 outline-none hover:bg-muted">
            <MoreHorizontal className="h-6 w-6 p-0.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent forceMount align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/profile/${authorId}`}>
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </SignOutButton>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Appearance</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent forceMount>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
export default Navbar
