// apps/web/src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from './providers'
import { Toaster } from '@/components/ui/sonner' // <-- 1. Verifique a importação

const inter = Inter({ subsets: ['latin'] })

// ... (metadata) ...

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster richColors position="top-right" /> {/* <-- 2. Verifique se o componente está aqui */}
      </body>
    </html>
  )
}