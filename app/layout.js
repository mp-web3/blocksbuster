
import { Inter } from 'next/font/google'
import text from '@/i18n/en/text.json'
import '@/app/css/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: text.metadata.title,
  description: text.metadata.description,
  openGraph: {
    title: text.metadata.og.title,
    description: text.metadata.og.description,
    siteName: text.metadata.og.siteName,
    url: text.metadata.og.url,
    type: text.metadata.og.type,
    locale: text.metadata.og.locale,
    image: {
      url: text.metadata.og.imageMain.url,
      width: text.metadata.og.imageMain.width,
      height: text.metadata.og.imageMain.height,
      alt: text.metadata.og.imageMain.alt,
    }

  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/blocksbuster.ico" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
