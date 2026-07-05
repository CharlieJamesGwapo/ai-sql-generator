import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI SQL Generator',
  description: 'Convert natural language to SQL queries with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
        {children}
      </body>
    </html>
  )
}
