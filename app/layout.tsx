import './globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import AuthSessionProvider from '@/providers/session-provider'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'HALLYNK - Student Accommodation Platform',
  description: 'Find the perfect student accommodation with HALLYNK',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSessionProvider>
          <div className="flex flex-col min-h-screen">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main>{children}</main>
            <Footer />
          <Toaster />
        </ThemeProvider>
          </div>
        </AuthSessionProvider>
      </body>
    </html>
  )
}