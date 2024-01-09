"use client"

import Link from "next/link"
import { useTheme } from "next-themes"
import { useRouter } from "next/navigation"
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
import { CheckIcon, MoreHorizontal } from "lucide-react"

const NavbarMenu = ({ userId }: { userId: string }) => {
  const { setTheme, theme } = useTheme()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full p-1 outline-none hover:bg-muted">
        <MoreHorizontal className="h-6 w-6 p-0.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent forceMount align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/profile/${userId}`}>
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
                <span className="h-4 w-4">
                  {theme === "light" ? <CheckIcon className="h-4 w-4" /> : null}
                </span>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("dark")}
                className="flex items-center gap-x-1">
                <span className="h-4 w-4">
                  {theme === "dark" ? <CheckIcon className="h-4 w-4" /> : null}
                </span>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme("system")}
                className="flex items-center gap-x-1">
                <span className="h-4 w-4">
                  {theme === "system" ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : null}
                </span>
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default NavbarMenu
