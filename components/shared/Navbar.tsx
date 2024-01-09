import { memo } from "react"
import NavbarTitle from "@/components/shared/NavbarTitle"
import NavbarMenu from "@/components/shared/NavbarMenu"
import { getUser } from "@/lib/actions/user.actions"

const Navbar = async () => {
  const user = await getUser()
  if (!user) return
  return (
    <nav className="sticky top-0 z-10 h-12 w-full border-b border-muted bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-2">
        <NavbarTitle />
        <NavbarMenu userId={user?._id} />
      </div>
    </nav>
  )
}
export default memo(Navbar)
