import { Inter } from 'next/font/google'
import './globals.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Store',
    default: 'Store',
  }
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function Layout({ children }: Readonly<{
  children: React.ReactNode;
}>)  {
  return (
    <html lang="en">
      <body className={`${inter.variable} h-screen relative`}>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}