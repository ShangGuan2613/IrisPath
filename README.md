# IrisPath - 病理分析系统

基于 React + Vite + Tailwind CSS + shadcn/ui 的病理分析系统。

## 技术栈

- **框架**: React 18
- **构建工具**: Vite 6
- **语言**: TypeScript 5.6
- **样式库**: Tailwind CSS 3.4
- **组件库**: shadcn/ui
- **状态管理**: Zustand
- **HTTP 客户端**: Axios

## 快速开始（本地运行）

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装步骤

1. **克隆或下载项目**
```bash
cd iris-path
```

2. **安装依赖**
```bash
npm install
```

3. **配置环境变量**
```bash
# 复制环境变量示例文件
cp .env.example .env

# 如需修改配置，编辑 .env 文件
```

4. **启动开发服务器**
```bash
npm run dev
```

5. **打开浏览器访问**
```
http://localhost:5173
```

## 项目结构

```
src/
├── components/
│   ├── ui/              # shadcn/ui 基础组件
│   ├── layout/          # 布局组件
│   └── pathology/       # 病理业务组件
├── config/              # 配置文件
│   └── env.ts          # 环境变量配置
├── lib/                # 工具函数和模拟数据
├── services/           # API 服务层
├── store/              # Zustand 状态管理
├── types/              # TypeScript 类型定义
├── App.tsx             # 主应用组件
├── main.tsx            # 应用入口
└── index.css           # 全局样式
```

## 环境配置

### 开发环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| VITE_API_BASE_URL | API 基础路径 | /api |
| VITE_API_TIMEOUT | 请求超时时间(ms) | 30000 |
| VITE_PROXY_TARGET | 开发代理目标地址 | http://localhost:8080 |
| VITE_MAX_FILE_SIZE | 最大文件大小(字节) | 104857600 (100MB) |
| VITE_ALLOWED_FILE_TYPES | 允许的文件类型 | .svs,.tif,.tiff,.png,.jpg,.jpeg |

### 环境文件说明

- `.env.example` - 环境变量示例文件（提交到仓库）
- `.env` - 本地开发环境配置（不提交到仓库）
- `.env.development` - 开发环境默认配置
- `.env.production` - 生产环境默认配置

## 可用脚本

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 运行代码检查
npm run lint
```

## API 接口

### 核心接口

| 接口 | 方法 | 路径 | 功能 |
|------|------|------|------|
| 病理切片分析 | POST | /api/analyze | 上传切片并获取分析结果 |

### 请求格式

- **Content-Type**: multipart/form-data
- **表单字段**: file (File) - 病理切片图片文件

### 支持的文件类型

- .svs (Whole Slide Image)
- .tif, .tiff (TIFF 格式)
- .png, .jpg, .jpeg (常见图片格式)

### 响应数据结构

```typescript
interface CaseData {
  id: string;
  filename: string;
  malignancyScore: number;  // 恶性度评分 (0-1)
  confidenceScore: number;  // 置信度评分
  findings: AnalysisPoint[];
  evidence: EvidenceItem[];
}

interface AnalysisPoint {
  category: 'Structure' | 'Cellular' | 'Invasion';
  description: string;
  citations: number[];
}

interface EvidenceItem {
  similarity: string;
  referenceId: string;
  source: string;
  relatedFeatures: string;
}
```

## 功能特性

- 左侧分析报告和聊天交互面板
- 中间病理切片查看器（支持缩放、平移）
- 右侧证据图谱展示
- 文件上传和 AI 分析
- 模拟数据 fallback 机制
- 响应式设计
- TypeScript 类型安全

## 安全特性

- 文件类型验证
- 文件大小限制
- 环境变量配置管理
- API 请求/响应拦截器
- 错误处理和重试机制

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 常见问题

### Q: 下载后无法运行？

**A:** 请检查以下几点：
1. Node.js 版本是否 >= 18.0.0 (`node --version`)
2. 是否执行了 `npm install` 安装依赖
3. 是否复制了 `.env.example` 为 `.env`
4. 端口 5173 是否被占用（可在 vite.config.ts 中修改）

### Q: 如何连接后端服务？

**A:** 修改 `.env` 文件中的 `VITE_PROXY_TARGET` 为你的后端服务地址：
```
VITE_PROXY_TARGET=http://your-backend-server:port
```

### Q: 生产环境如何部署？

**A:** 
1. 执行 `npm run build` 生成 dist 文件夹
2. 将 dist 文件夹部署到任意静态文件服务器
3. 配置反向代理将 /api 请求转发到后端服务

## 许可证

MIT
