"use client"

import { usePathname, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const NavbarTitle = () => {
  const pathname = usePathname()
  const router = useRouter()
  let title = ""
  if (pathname === "/") title = "Home"
  if (pathname === "/search") title = "Search"
  if (pathname === "/notifications") title = "Notifications"
  if (pathname === "/thread") title = "Post"
  if (pathname === "/create-post") title = "Create post"
  if (pathname.startsWith("/profile/")) title = "Profile"
  if (pathname === "/profile/edit") title = "Edit profile"
  return (
    <div className="flex items-center">
      {pathname !== "/" ? (
        <div
          role="button"
          className="rounded-full p-1 outline-none hover:bg-muted"
          onClick={() => router.back()}>
          <ArrowLeft className="h-6 w-6 p-0.5" />
        </div>
      ) : (
        <div className="h-6 w-6 p-0.5"></div>
      )}
      <span className="pl-4 text-lg font-semibold">{title}</span>
    </div>
  )
}
export default NavbarTitle
