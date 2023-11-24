"use client"
import { usePathname } from "next/navigation"
import { HomeIcon, SearchIcon, CreateIcon, HeartIcon, UserIcon } from "./Icons"
import Link from "next/link"

const Bottombar = ({ userId }: { userId: string }) => {
  const pathname = usePathname()
  return (
    <main className="sticky bottom-0 left-0 flex w-full justify-evenly bg-background sm:hidden border-t-muted border-t-[1px]">
      <Link href="/" className="contents">
        <div className="flex w-full items-center justify-center py-3 rounded-md hover:bg-muted">
          <HomeIcon
            className={`${pathname === "/" && "stroke-primary stroke-1"}`}
          />
        </div>
      </Link>
      <Link href="/search" className="contents">
        <div className="flex w-full items-center justify-center py-3 rounded-md hover:bg-muted">
          <SearchIcon
            className={`${pathname === "/search" && "stroke-primary stroke-1"}`}
          />
        </div>
      </Link>
      <Link href="/create-post" className="contents">
        <div className="flex w-full items-center justify-center py-3 rounded-md hover:bg-muted">
          <CreateIcon
            className={`${
              pathname === "/create-post" && "stroke-primary stroke-1"
            }`}
          />
        </div>
      </Link>
      <Link href="/notifications" className="contents">
        <div className="flex w-full items-center justify-center py-3 rounded-md hover:bg-muted">
          <HeartIcon
            className={`${
              pathname === "/notifications" && "stroke-primary stroke-1"
            }`}
          />
        </div>
      </Link>
      <Link href={`/profile/${userId}`} className="contents">
        <div className="flex w-full items-center justify-center py-3 rounded-md hover:bg-muted">
          <UserIcon
            className={`${
              pathname === `/profile/${userId}` && "stroke-primary stroke-1"
            }`}
          />
        </div>
      </Link>
    </main>
  )
}
export default Bottombar
