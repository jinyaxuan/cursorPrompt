'use client'

import { useState } from 'react'
import MainLayout from '@/components/layout/MainLayout'
import FrameworkSelector from '@/components/features/FrameworkSelector'
import { ChevronDown, Loader, Copy, Check } from 'lucide-react'

export type DesignData = {
  description: string
  framework: string
  analysisType: string
}

const analysisTypes = [
  '架构设计分析',
  '组件设计分析',
  '数据流设计',
  '性能优化建议',
  '工程实践建议',
  '测试方案建议'
]

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)
  
  const [designData, setDesignData] = useState<DesignData>({
    description: '',
    framework: 'django',
    analysisType: '架构设计分析'
  })

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDesignData(prev => ({ ...prev, description: e.target.value }))
  }

  const handleFrameworkChange = (framework: string) => {
    setDesignData(prev => ({ ...prev, framework }))
  }

  const handleAnalysisTypeChange = (analysisType: string) => {
    setDesignData(prev => ({ ...prev, analysisType }))
  }

  const generatePrompt = async () => {
    if (!designData.description) {
      alert('请先输入需求描述')
      return
    }

    setIsGenerating(true)
    setError('')
    setIsCopied(false)
    setGeneratedPrompt('')
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(designData)
      })

      if (!response.ok) {
        throw new Error('生成失败')
      }

      const data = await response.json()
      setGeneratedPrompt(data.content)
    } catch (err) {
      console.error('生成错误:', err)
      setError('生成失败，请重试')
    } finally {
      setIsGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      const textToCopy = `# 功能需求
${designData.description}

# 技术选型
- 目标框架：${designData.framework}
- 分析类型：${designData.analysisType}

# 功能表述
1. 基本功能
${designData.description.split(/[,，.。;\n]/).filter(Boolean).map(item => `- ${item.trim()}`).join('\n')}

# 技术分析
${generatedPrompt}`

      await navigator.clipboard.writeText(textToCopy)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-6 min-h-[calc(100vh-7rem)]">
        {/* 左侧面板 */}
        <div className="w-full lg:w-3/5">
          <div className="max-w-3xl space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-white">
                输入需求描述
              </h1>
              <p className="text-gray-400 text-sm">
                请详细描述您的功能需求，我们将为您生成专业的工程实现建议
              </p>
            </div>
            
            {/* 需求描述输入 */}
            <div className="space-y-2">
              <textarea
                value={designData.description}
                onChange={handleDescriptionChange}
                placeholder="例如：我需要开发一个在线商城系统，包含用户管理、商品管理、订单管理、支付功能等..."
                className="w-full h-40 p-4 bg-[#1E2A35] text-white rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#0066FF] placeholder-gray-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 分析类型选择 */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  分析类型
                </label>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-3 bg-[#1E2A35] text-white rounded-lg flex items-center justify-between hover:bg-[#1E2A35]/80 transition-colors"
                >
                  <span>{designData.analysisType}</span>
                  <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#1E2A35] rounded-lg shadow-xl z-10">
                    {analysisTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          handleAnalysisTypeChange(type)
                          setIsDropdownOpen(false)
                        }}
                        className="w-full p-3 text-left text-white hover:bg-[#000D18] transition-colors"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 生成按钮 */}
              <div className="flex items-end">
                <button
                  onClick={generatePrompt}
                  disabled={isGenerating || !designData.description}
                  className={`w-full p-3 rounded-lg flex items-center justify-center space-x-2 transition-colors
                    ${isGenerating || !designData.description
                      ? 'bg-[#0066FF]/50 cursor-not-allowed'
                      : 'bg-[#0066FF] hover:bg-[#0066FF]/90'
                    }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>AI 分析中...</span>
                    </>
                  ) : (
                    <span>开始分析</span>
                  )}
                </button>
              </div>
            </div>
            
            <div className="pt-4">
              <FrameworkSelector 
                selected={designData.framework}
                onSelect={handleFrameworkChange}
              />
            </div>
          </div>
        </div>
        
        {/* 右侧面板 */}
        <div className="w-full lg:w-2/5 bg-[#1E2A35] rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-white">分析结果</h2>
                <p className="text-sm text-gray-400">AI 将为您生成专业的工程实现建议</p>
              </div>
              {generatedPrompt && (
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  title="复制到剪贴板"
                >
                  {isCopied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>

            {/* 错误提示 */}
            {error && (
              <div className="p-4 bg-red-500/10 text-red-500 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* 生成结果 */}
            {isGenerating ? (
              <div className="p-8 bg-[#000D18] rounded-lg flex items-center justify-center">
                <div className="flex flex-col items-center space-y-3">
                  <Loader className="w-8 h-8 animate-spin text-[#0066FF]" />
                  <p className="text-gray-400 text-sm">AI 正在分析您的需求...</p>
                </div>
              </div>
            ) : generatedPrompt ? (
              <div className="p-4 bg-[#000D18] rounded-lg space-y-4">
                <div className="space-y-2 pb-4 border-b border-gray-700">
                  <div className="text-gray-400 text-xs">需求描述：</div>
                  <div className="text-white text-sm">{designData.description}</div>
                </div>
                <div className="space-y-2 pb-4 border-b border-gray-700">
                  <div className="text-gray-400 text-xs">目标框架：</div>
                  <div className="text-white text-sm">{designData.framework}</div>
                </div>
                <div className="space-y-2 pb-4 border-b border-gray-700">
                  <div className="text-gray-400 text-xs">分析类型：</div>
                  <div className="text-white text-sm">{designData.analysisType}</div>
                </div>
                <div className="space-y-2">
                  <div className="text-gray-400 text-xs">分析结果：</div>
                  <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">
                    {generatedPrompt}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-[#000D18] rounded-lg flex items-center justify-center">
                <p className="text-gray-400 text-sm text-center">
                  在左侧输入需求描述并点击"开始分析"<br />
                  AI 将为您生成详细的工程实现建议
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
} 