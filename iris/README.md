# 病理分析系统

基于 React + Vite + Tailwind CSS + shadcn/ui 的病理分析系统。

## 技术栈

- **框架**: React 18
- **构建工具**: Vite 5
- **语言**: TypeScript
- **样式库**: Tailwind CSS
- **组件库**: shadcn/ui
- **状态管理**: Zustand

## 项目结构

```
iris/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui 基础组件
│   │   └── pathology/       # 业务组件
│   ├── store/               # Zustand 状态管理
│   ├── types/               # TypeScript 类型定义
│   ├── lib/                 # 工具函数
│   ├── App.tsx              # 主应用组件
│   ├── main.tsx             # 应用入口
│   └── index.css            # 全局样式
├── components.json          # shadcn/ui 配置
├── tailwind.config.js       # Tailwind CSS 配置
├── tsconfig.json            # TypeScript 配置
└── vite.config.ts           # Vite 配置
```

## 安装依赖

```bash
npm install
```

## 运行开发服务器

```bash
npm run dev
```

## 构建生产版本

```bash
npm run build
```

## 预览生产构建

```bash
npm run preview
```

## 添加 shadcn/ui 组件

```bash
npx shadcn-ui@latest add [component-name]
```

例如，添加按钮组件：

```bash
npx shadcn-ui@latest add button
```

## 功能特性

- 左侧 70% 切片查看器
- 右侧 30% 分析面板
- 全屏布局，无滚动条
- 响应式设计
- 深色/浅色主题支持
- TypeScript 类型安全
- Zustand 状态管理