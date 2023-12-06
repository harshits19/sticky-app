"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const SearchUsersForm = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>("")

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        router.push(`?q=` + search)
      } else {
        router.push(`/search`)
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [search])

  return (
    <div className="flex items-center gap-x-2 p-2">
      <Input
        placeholder="search"
        className="no-focus my-1 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="ghost" className="flex items-center justify-center">
        <Search className="h-5 w-5 text-primary" />
      </Button>
    </div>
  )
}
export default SearchUsersForm
