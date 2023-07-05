import { Nunito } from 'next/font/google'

import Modal from './components/modals/Modal'
import NavBar from './components/navbar/Navbar'
import './globals.css'
import Register from './components/modals/Register'

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
        <Register/>
        <NavBar />

        {children}
      </body>
    </html>
  )
}
