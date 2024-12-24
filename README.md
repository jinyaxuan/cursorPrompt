# AI 工程开发助手

一个基于 AI 的工程开发助手，可以根据需求描述自动生成详细的工程实现建议，包括架构设计、API 设计、组件设计等多个维度的分析。

## 功能特点

- 🚀 支持多种主流框架
  - Python: Django, Flask, FastAPI
  - JavaScript/TypeScript: React, Vue.js, Angular, Next.js, Nuxt.js
  - 移动端: Flutter, React Native
  - 后端: Spring Boot, NestJS, Laravel, .NET Core, Gin, Express

- 📊 多维度分析
  - 架构设计分析
  - 组件设计分析
  - 数据流设计
  - 性能优化建议
  - 工程实践建议
  - 测试方案建议

- 💡 智能分析
  - 自动拆分功能点
  - 生成详细技术方案
  - 提供代码示例
  - 完整的工程建议

## 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn

### 本地开发

1. 克隆项目
```bash
git clone <repository-url>
cd ai-engineering-assistant
```

2. 安装依赖
```bash
npm install
```

3. 配置环境变量
```bash
cp .env.example .env.local
# 编辑 .env.local 文件，设置你的 KIMI_API_KEY
```

4. 启动开发服务器
```bash
npm run dev
```

5. 访问应用
```
http://localhost:3000
```

### Docker 部署

1. 构建镜像
```bash
docker build -t ai-engineering-assistant .
```

2. 运行容器
```bash
docker run -p 3000:3000 -e KIMI_API_KEY=your_api_key ai-engineering-assistant
```

### Kubernetes 部署

1. 创建 Secret
```bash
kubectl create secret generic app-secrets --from-literal=kimi-api-key=your_api_key
```

2. 部署应用
```bash
kubectl apply -f kubernetes/deployment.yaml
```

## 使用指南

1. 输入需求描述
   - 在文本框中详细描述你的功能需求
   - 尽可能包含具体的功能点

2. 选择目标框架
   - 从支持的框架列表中选择你想使用的框架
   - 框架按类别分组展示

3. 选择分析类型
   - 选择你需要的分析维度
   - 可以针对特定方面获取建议

4. 获取分析结果
   - 点击"开始分析"按钮
   - AI 将生成详细的工程实现建议
   - 可以复制结果用于进一步讨论

## 技术栈

- 前端框架：Next.js 14
- UI 组件：Tailwind CSS
- 图标：Lucide React
- API：Kimi API
- 容器化：Docker
- 编排：Kubernetes
- 部署：Sealos

## 开发团队

- 维护者：[Your Name]
- 贡献者：欢迎提交 PR

## 许可证

MIT License 