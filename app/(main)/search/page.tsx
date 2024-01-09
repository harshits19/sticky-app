import { Metadata } from "next"
import ProfileCard from "@/components/cards/ProfileCard"
import SearchUsersForm from "@/components/forms/SearchUsersForm"
import { getAllUsers, getUser } from "@/lib/actions/user.actions"
import { ProfileCardProps } from "@/types"

export const metadata: Metadata = {
  title: "Search",
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined }
}) => {
  const userInfo = await getUser()
  const { users } = await getAllUsers(userInfo._id, searchParams.q)
  return (
    <>
      <SearchUsersForm />
      <section className="pb-4 pt-2">
        {users?.length === 0 ? (
          <div className="px-4 pt-6 text-center">
            <p className="text-xl font-bold">{`No results for ${searchParams.q}`}</p>
            <p className="text-sm">Try searching for something else.</p>
          </div>
        ) : (
          users?.map((user: ProfileCardProps) => (
            <ProfileCard data={user} key={user._id} userId={userInfo._id} />
          ))
        )}
      </section>
    </>
  )
}
export default SearchPage
