import { Nunito } from 'next/font/google'

import './globals.css'
import NavBar from './components/navbar/Navbar'
import Login from './components/login/Login'

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
        <Login actionLabel="Submit" title="Login" isOpen />
        <NavBar />
        {children}
      </body>
    </html>
  )
}
