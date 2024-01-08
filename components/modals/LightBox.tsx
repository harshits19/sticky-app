"use client"
import Image from "next/image"
import { ImageDialog, ImageDialogContent } from "@/components/ui/image-dialog"
import { useLightBox } from "@/hooks/useLightBox"

const LightBox = () => {
  const { isOpen, onClose, url } = useLightBox()
  return (
    <ImageDialog open={isOpen} onOpenChange={onClose}>
      <ImageDialogContent>
        {url && (
          <Image
            src={url}
            height={600}
            width={600}
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
            alt="image"
          />
        )}
      </ImageDialogContent>
    </ImageDialog>
  )
}
export default LightBox
