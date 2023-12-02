import Image from "next/image"
import Link from "next/link"
import { Button } from "../ui/button"

type Props = {
  _id: string
  name: string
  profilePhoto: string
  username: string
  bio: string
}
const ProfileCard = ({ data, userId }: { data: Props; userId?: string }) => {
  return (
    <div className="flex p-4">
      <div className="min-w-[3rem]">
        <Image
          src={data?.profilePhoto}
          alt="data-pic"
          height={36}
          width={36}
          quality={100}
          className="h-9 w-9 rounded-full"
        />
      </div>
      <div className="flex w-full flex-col">
        <h4 className="text-base font-bold leading-5">{data.name}</h4>
        <h4 className="text-sm leading-4 text-muted-foreground">
          {"@" + data.username}
        </h4>
        <p className="pt-1 text-sm">{data.bio}</p>
      </div>
      {data._id?.toString() !== userId && (
        <Button className="rounded-full" variant={"default"}>
          Follow
        </Button>
      )}
    </div>
  )
}
export default ProfileCard
