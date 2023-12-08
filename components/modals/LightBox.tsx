"use client"
import Image from "next/image"
// import { useEffect, useState } from "react"
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { useLightBox } from "@/hooks/useLightBox"

const LightBox = () => {
  const { isOpen, onClose, url } = useLightBox()
  /* const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])
  if (!isMounted) return null */
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="">
        {url && (
          <Image
            src={url}
            height={400}
            width={400}
            quality={100}
            className="max-h-[600px] max-w-5xl object-cover"
            alt="image"
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
export default LightBox
