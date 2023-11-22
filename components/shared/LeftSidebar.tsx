"use client"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { SignOutButton, SignedIn } from "@clerk/nextjs"
import { Button } from "../ui/button"

type Props = {}
const LeftSidebar = (props: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className="flex w-96 sticky top-16 flex-col gap-6 px-6 bg-gray-200 h-full">
      <div className="">
          <Link href={"/create-post"}>
            Create
          </Link>
        <div className="mt-10 px-6">
          <SignedIn>
            <SignOutButton signOutCallback={() => router.push("/sign-in")}>
              <Button variant="default" size="lg">
                Logout
              </Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </section>
  )
}
export default LeftSidebar
