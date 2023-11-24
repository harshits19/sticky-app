"use client"
import { SignOutButton } from "@clerk/nextjs"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
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
import { ArrowLeft, MoreHorizontal } from "lucide-react"

const Navbar = ({ userId }: { userId: string }) => {
  const { setTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  return (
    <nav className="sticky top-0 z-10 h-12 w-full border-b border-muted bg-background">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full p-1 outline-none hover:bg-muted">
            <MoreHorizontal className="h-6 w-6 p-0.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent forceMount align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/profile/${userId}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton signOutCallback={() => router.push("/sign-in")}>
                Logout
              </SignOutButton>
            </DropdownMenuItem>
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
