import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GenAI Analytics Tool',
  description: 'Convert natural language into SQL queries and visualize data effortlessly.',
  generator: 'v0.dev',
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
