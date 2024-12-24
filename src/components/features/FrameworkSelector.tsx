'use client'

import React from 'react'

interface FrameworkSelectorProps {
  selected: string
  onSelect: (framework: string) => void
}

interface Framework {
  id: string
  name: string
  description: string
}

const frameworks: Framework[] = [
  // Python 框架
  {
    id: 'django',
    name: 'Django',
    description: 'Python 高级 Web 框架'
  },
  {
    id: 'flask',
    name: 'Flask',
    description: '轻量级 Web 框架'
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    description: '现代高性能框架'
  },
  // JavaScript/TypeScript 框架
  {
    id: 'react',
    name: 'React',
    description: 'JavaScript UI 库'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: '渐进式 JavaScript 框架'
  },
  {
    id: 'angular',
    name: 'Angular',
    description: '企业级 TypeScript 框架'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    description: 'React 全栈框架'
  },
  {
    id: 'nuxt',
    name: 'Nuxt.js',
    description: 'Vue 全栈框架'
  },
  // 移动端框架
  {
    id: 'flutter',
    name: 'Flutter',
    description: '跨平台 UI 框架'
  },
  {
    id: 'reactnative',
    name: 'React Native',
    description: '原生移动应用框架'
  },
  // 后端框架
  {
    id: 'spring',
    name: 'Spring Boot',
    description: 'Java 企业级框架'
  },
  {
    id: 'nestjs',
    name: 'NestJS',
    description: 'Node.js 企业框架'
  },
  {
    id: 'laravel',
    name: 'Laravel',
    description: 'PHP 全栈框架'
  },
  {
    id: 'dotnet',
    name: '.NET Core',
    description: '跨平台企业框架'
  },
  {
    id: 'gin',
    name: 'Gin',
    description: 'Go Web 框架'
  },
  {
    id: 'express',
    name: 'Express',
    description: 'Node.js Web 框架'
  }
]

interface FrameworkCategory {
  [key: string]: Framework[]
}

export default function FrameworkSelector({ selected, onSelect }: FrameworkSelectorProps) {
  // 按类别分组框架
  const frameworkCategories: FrameworkCategory = {
    'Python 框架': frameworks.slice(0, 3),
    'JavaScript/TypeScript 框架': frameworks.slice(3, 8),
    '移动端框架': frameworks.slice(8, 10),
    '后端框架': frameworks.slice(10)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">选择目标框架</h2>
      {Object.entries(frameworkCategories).map(([category, items]) => (
        <div key={category} className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400">{category}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {items.map((framework) => (
              <button
                key={framework.id}
                onClick={() => onSelect(framework.id)}
                className={`p-3 rounded-lg flex flex-col items-center space-y-2 transition-colors
                  ${selected === framework.id
                    ? 'bg-[#0066FF] text-white'
                    : 'bg-[#1E2A35] text-gray-400 hover:bg-[#1E2A35]/80'
                  }`}
              >
                <span className="font-medium text-sm">{framework.name}</span>
                <span className="text-xs opacity-75 text-center">{framework.description}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
} 