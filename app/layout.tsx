import { Nunito } from "next/font/google"

import { getCurrentUser } from "./actions/getCurrentUser"
import Login from "./components/modals/Login"
import Register from "./components/modals/Register"
import Rent from "./components/modals/Rent"
import Filter from "./components/modals/filter"
import NavBar from "./components/navbar/Navbar"
import ToasterProvider from "./components/providers/ToasterProvider"
import "./globals.css"

const font = Nunito({ subsets: ["latin"] })

export const metadata = {
  title: "Clearbnb",
  description: "Clearbnb front end",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Filter />
        <Rent />
        <Login />
        <Register />
        <NavBar currentUser={currentUser} />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  )
}
