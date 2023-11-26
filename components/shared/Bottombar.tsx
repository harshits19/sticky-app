"use client"
import { usePathname } from "next/navigation"
import { HomeIcon, SearchIcon, CreateIcon, HeartIcon, UserIcon } from "./Icons"
import Link from "next/link"

const Bottombar = ({ userId }: { userId: string }) => {
  const pathname = usePathname()
  return (
    <main className="sticky bottom-0 left-0 flex w-full justify-evenly border-t-[1px] border-t-muted bg-background sm:hidden">
      <Link href="/" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <HomeIcon
            className={`${
              pathname === "/" ? "fill-current" : "fill-transparent"
            }`}
          />
        </div>
      </Link>
      <Link href="/search" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <SearchIcon />
        </div>
      </Link>
      <Link href="/create-post" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <CreateIcon />
        </div>
      </Link>
      <Link href="/notifications" className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <HeartIcon
            className={`${
              pathname === "/notifications"
                ? "fill-current"
                : "fill-transparent"
            }`}
          />
        </div>
      </Link>
      <Link href={`/profile/${userId}`} className="contents">
        <div className="flex w-full items-center justify-center rounded-md py-3 hover:bg-muted">
          <UserIcon
            className={`${
              pathname === `/profile/${userId}`
                ? "fill-current"
                : "fill-transparent"
            }`}
          />
        </div>
      </Link>
    </main>
  )
}
export default Bottombar
