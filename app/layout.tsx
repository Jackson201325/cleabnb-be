import { Nunito } from 'next/font/google'

import Login from './components/modals/Login'
import Register from './components/modals/Register'
import NavBar from './components/navbar/Navbar'
import ToasterProvider from './components/providers/ToasterProvider'
import './globals.css'

const font = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Clearbnb',
  description: 'Clearbnb front end',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <Login />
        <Register />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
