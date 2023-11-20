"use client"
type Props = {}
import { usePathname, useRouter } from "next/navigation"
import { sidebarLinks } from "@/constants"
import Image from "next/image"
import Link from "next/link"

const Bottombar = (props: Props) => {
  const pathname = usePathname()
  const router = useRouter()
  return (
    <section className="fixed bottom-0 left-0 flex sm:hidden">
      Bottombar
    </section>
  )
}
export default Bottombar
