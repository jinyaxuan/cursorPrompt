'use client'

import { Code } from 'lucide-react'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-[#000D18]">
      <header className="bg-[#1E2A35] border-b border-[rgba(255,255,255,0.1)]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <div className="flex items-center space-x-3">
            <Code className="text-[#0066FF] w-6 h-6" />
            <span className="text-white font-semibold">AI 工程开发助手</span>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  )
} 