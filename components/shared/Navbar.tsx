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
import { ArrowLeft, CheckIcon, MoreHorizontal } from "lucide-react"

const Navbar = ({
  authorId,
  postsNum = 0,
  authorName,
  username,
  navTitle,
}: {
  authorId?: string
  postsNum?: number
  authorName?: string
  username?: string
  navTitle?: string
}) => {
  const { setTheme, theme } = useTheme()
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
          {navTitle && (
            <span className="pl-4 text-lg font-semibold">{navTitle}</span>
          )}
          {pathname.startsWith(`/profile/`) && (
            <div className="flex flex-col justify-center pl-4">
              <span className="text-lg font-bold leading-5">{authorName}</span>
              {pathname.startsWith(`/profile/${authorId}/follow`) ||
              pathname.startsWith(`/profile/edit`) ? (
                <span className="text-xs leading-4 text-muted-foreground">
                  {"@" + username}
                </span>
              ) : (
                <span className="text-xs leading-4 text-muted-foreground">{`${formatNum(
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
                  <DropdownMenuItem
                    onClick={() => setTheme("light")}
                    className="flex items-center gap-x-1">
                    {theme === "light" ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <span className="h-4 w-4" />
                    )}
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("dark")}
                    className="flex items-center gap-x-1">
                    {theme === "dark" ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <span className="h-4 w-4" />
                    )}
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setTheme("system")}
                    className="flex items-center gap-x-1">
                    {theme === "system" ? (
                      <CheckIcon className="h-4 w-4" />
                    ) : (
                      <span className="h-4 w-4" />
                    )}
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
