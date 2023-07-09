import { Nunito } from 'next/font/google'

import Register from './components/modals/Register'
import { NavBar } from './components/navbar/Navbar'
import './globals.css'
import ToasterProvider from './components/providers/ToasterProvider'
import Login from './components/modals/Login'
import { getCurrentUser } from './actions/getCurrentUser'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Clearbnb',
  description: 'Clearbnb front end',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser()

  console.log(currentUser)

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Login />
        <Register />
        <NavBar currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
