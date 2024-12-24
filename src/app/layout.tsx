import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI UI 设计提示生成器',
  description: '使用 AI 生成详细的 UI 开发提示',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
} 