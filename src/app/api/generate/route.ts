import { NextResponse } from 'next/server'

const KIMI_API_KEY = process.env.KIMI_API_KEY
const API_URL = 'https://api.moonshot.cn/v1/chat/completions'

export async function POST(request: Request) {
  if (!KIMI_API_KEY) {
    return NextResponse.json({ error: '缺少 API 密钥' }, { status: 500 })
  }

  try {
    const { description, framework, analysisType } = await request.json()
    console.log('请求参数:', { description, framework, analysisType })

    const messages = [
      {
        role: 'system',
        content: '你是一个专业的工程开发专家，精通各种前后端框架。请基于用户的需求提供详细的技术建议，包括具体的API设计和文件结构。请尽可能详细地提供建议，不要考虑输出长度的限制。'
      },
      {
        role: 'user',
        content: `作为一个专业的工程师，请基于以下信息生成具体的工程实现建议：

框架：${framework}
分析类型：${analysisType}
功能需求：${description}

请提供以下方面的具体建议：

1. 项目结构设计
- 完整的目录结构
- 文件命名规范
- 模块划分策略
- 资源组织方式

2. API 接口设计
- RESTful 接口定义
- 请求/响应格式
- 状态码规范
- 接口文档示例

3. 组件设计
- 组件结构和层次
- 组件间通信方式
- 状态管理策略
- 复用性设计

4. 数据流设计
- 数据获取方式
- 状态更新流程
- 缓存策略
- 异步处理方案

5. 性能优化
- 代码分割方案
- 懒加载策略
- 渲染优化
- 资源加载优化

6. 工程实践
- 开发规范
- 代码组织
- 类型定义
- 错误处理

7. 测试方案
- 单元测试
- 组件测试
- 集成测试
- E2E测试

请针对${framework}框架的特点，提供具体且可直接实施的建议。回答要包含示例代码和具体的实现细节。对于API设计和文件结构，请给出完整的示例。不要考虑输出长度的限制，尽可能详细地提供建议。`
      }
    ]

    console.log('准备调用 Kimi API...')
    const apiResponse = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KIMI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'moonshot-v1-32k',
        messages,
        temperature: 0.7,
        top_p: 0.8,
        stream: false,
        max_tokens: 8000
      })
    })

    console.log('Kimi API 响应状态:', apiResponse.status)

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json()
      console.error('API 响应错误:', errorData)
      throw new Error(`API 请求失败: ${apiResponse.status} ${apiResponse.statusText}`)
    }

    const data = await apiResponse.json()
    console.log('Kimi API 响应成功')

    return NextResponse.json({ 
      content: data.choices[0].message.content || '生成失败，请重试'
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: '生成失败，请重试',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 })
  }
} 