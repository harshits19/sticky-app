"use client"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { SingleImageDropzone } from "@/components/shared/SingleImageDropzone"
import { useProfilePhoto } from "@/hooks/useProfilePhoto"
import { useEdgeStore } from "@/lib/edgestore"
import { updateUser } from "@/lib/actions/user.actions"

const UploadImageModal = ({
  userId,
  profilePic,
}: {
  userId?: string
  profilePic?: boolean
}) => {
  const { isOpen, onClose, url, addImg } = useProfilePhoto()
  const [file, setFile] = useState<File>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { edgestore } = useEdgeStore()
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null
  const onCloseModal = () => {
    setFile(undefined)
    setIsSubmitting(false)
    onClose()
  }
  const onChange = async (file?: File) => {
    if (!file) return
    setIsSubmitting(true)
    setFile(file)
    try {
      const res = await edgestore.publicFiles.upload({
        file,
        options: {
          replaceTargetUrl: url,
        },
      })
      addImg(res.url)
      userId &&
        profilePic &&
        (await updateUser({
          userId: userId,
          path: "/profile/edit",
          profilePhoto: res.url,
        }))
    } catch (err) {
      toast.error("Error uploading image. The file size may be too large.")
    }
    onCloseModal()
  }
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">Upload Image</h2>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          value={file}
          onChange={onChange}
        />
      </DialogContent>
    </Dialog>
  )
}
export default UploadImageModal
