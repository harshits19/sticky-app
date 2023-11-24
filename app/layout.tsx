import type { Metadata } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import "@/app/globals.css"
import { EdgeStoreProvider } from "@/lib/edgestore"
import { ThemeProvider } from "@/components/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sticky",
  description: "A versatile socializing app",
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <ClerkProvider>
        <body className={inter.className}>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="themeVal">
              <Toaster />
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </ClerkProvider>
    </html>
  )
}
export default RootLayout
