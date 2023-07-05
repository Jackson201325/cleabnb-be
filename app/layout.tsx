import { Nunito } from 'next/font/google'

import Register from './components/modals/Register'
import NavBar from './components/navbar/Navbar'
import './globals.css'
import ToasterProvider from './components/providers/ToasterProvider'

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
        <Register />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
