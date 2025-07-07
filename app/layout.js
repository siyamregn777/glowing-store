import { Outfit } from "next/font/google"
import "./globals.css"
import { AppContextProvider } from "../context/AppContext"
import { Toaster } from "react-hot-toast"
import Providers from "./providers"
import { getServerSession } from "next-auth"
import { authOptions } from "../lib/auth"

const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] })

export const metadata = {
  title: "Glowing-Store",
  description: "E-Commerce with Next.js",
}

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <Providers session={session}>
          <Toaster position="top-center" />
          <AppContextProvider>
            {children}
          </AppContextProvider>
        </Providers>
      </body>
    </html>
  )
}