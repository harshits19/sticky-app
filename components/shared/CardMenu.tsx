"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { deleteThread } from "@/lib/actions/thread.actions"
import { MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"

const CardMenu = ({
  postId,
  authorId,
  userId,
}: {
  postId: string
  authorId: string
  userId: string
}) => {
  const pathname = usePathname()
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation()
    const promise = deleteThread(postId, pathname)
    toast.promise(promise, {
      loading: "Deleting Post...",
      success: "Post deleted!",
      error: "Failed to delete post",
    })
  }
  return (
    <>
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this post?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger className="outline-none">
          <MoreHorizontal className="h-6 w-6 rounded-full p-1 hover:bg-muted-foreground/20" />
        </DropdownMenuTrigger>
        <DropdownMenuContent forceMount align="end">
          <Link
            href={`/profile/${authorId}`}
            onClick={(e) => e.stopPropagation()}
            scroll={false}
            className="contents">
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </Link>
          {authorId === userId && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation(), setDialogOpen(true)
                }}>
                Delete
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
export default CardMenu
