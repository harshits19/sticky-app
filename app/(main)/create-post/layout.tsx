import Navbar from "@/components/shared/Navbar"

const CreatePostLayout = async ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <>
      <Navbar navTitle="Create Post" />
      {children}
    </>
  )
}
export default CreatePostLayout
