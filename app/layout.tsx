import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { dark } from "@clerk/themes"
import "@/app/globals.css"
import { EdgeStoreProvider } from "@/lib/edgestore"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sticky",
  description: "A versatile socializing app",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <ClerkProvider
        appearance={
          {
            /*  baseTheme: dark, */
          }
        }>
        <body className={inter.className}>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
export default RootLayout
