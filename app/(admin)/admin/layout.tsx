import { Inter } from 'next/font/google'
import {Footer} from "@/app/ui/footer"
import AdminHeader from "@/app/ui/admin/adminHeader"
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'Admin',
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
      <div className={`${inter.variable} bg-gray-900`}>
        <AdminHeader />
        <div className='py-20 p-4 '>
          {children}
        </div>
        <Footer />
      </div>
  )
}