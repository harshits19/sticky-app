import { cn } from "@/lib/utils"
import Image from "next/image"

const ImageContainer = ({ images }: { images: string[] }) => {
  return (
    <div>
      {images?.length > 0 && (
        <div
          className={cn(
            "grid gap-x-1 pb-2",
            images?.length > 1 && "grid-cols-2 gap-y-1",
          )}>
          {images?.map((imgUrl) => (
            <div key={imgUrl}>
              <Image
                src={imgUrl}
                alt="post-image"
                className={cn(
                  "h-full max-h-96 w-full rounded-xl object-cover",
                  images?.length > 1 && "max-h-48",
                )}
                sizes="100vw"
                width={200}
                height={100}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default ImageContainer
