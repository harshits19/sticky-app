import LeftSidebar from "@/components/shared/LeftSidebar"
import RightSidebar from "@/components/shared/RightSidebar"
import LightBox from "@/components/modals/LightBox"
import Navbar from "@/components/shared/Navbar"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="mx-auto flex min-h-screen w-full justify-center xl:max-w-7xl">
        <LeftSidebar />
        <section className="w-full pb-40 sm:max-w-xl">
          <Navbar />
          {children}
        </section>
        <RightSidebar />
      </main>
      <LightBox />
    </>
  )
}
export default MainLayout
