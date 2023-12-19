import Image from "next/image"
import { cn } from "@/lib/utils"
import { useLightBox } from "@/hooks/useLightBox"
import { XIcon } from "lucide-react"

const ImageContainer = ({
  images,
  isForm,
  removeImg,
}: {
  images: string[]
  isForm?: boolean
  removeImg: (url: string) => void
}) => {
  const { addUrl } = useLightBox()
  return (
    images?.length > 0 && (
      <div
        className={cn(
          "grid gap-x-1 py-2",
          images?.length > 1 && "grid-cols-2",
        )}>
        {images?.map((imgUrl) => (
          <div
            key={imgUrl}
            className={cn("relative", images?.length > 1 && "max-h-64")}
            onClick={(e) => {
              e.stopPropagation()
              if (!isForm) addUrl(imgUrl)
            }}>
            {isForm && (
              <div
                className="absolute right-1 top-1 cursor-pointer rounded-full bg-black/90 p-1.5 hover:bg-black"
                onClick={() => removeImg(imgUrl)}>
                <XIcon className="h-4 w-4 text-secondary" />
              </div>
            )}
            <Image
              src={imgUrl}
              alt="post-image"
              className={"h-full max-h-96 w-full rounded-xl object-cover"}
              sizes="100vw"
              quality={100}
              width={200}
              height={100}
            />
          </div>
        ))}
      </div>
    )
  )
}
export default ImageContainer
