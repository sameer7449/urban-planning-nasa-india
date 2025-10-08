import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Urban Planning with NASA Earth Science Data',
  description: 'Interactive prototype leveraging NASA Earth observation data for sustainable urban planning',
  keywords: 'urban planning, NASA, earth science, sustainability, data visualization',
  authors: [{ name: 'Urban Planning Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <div className="min-h-screen">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
