# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Codex Agent — 基于 NestJS + Vue 3 的 AI Agent 平台。monorepo 采用 pnpm workspace 管理。

## 常用命令

```bash
# 根目录——批量运行所有子项目
pnpm start          # pnpm -r run dev（开发模式）
pnpm build          # pnpm -r run build（构建）
pnpm type-check     # pnpm -r run type-check（类型检查）

# 前端 (frontend/pc)
cd frontend/pc
pnpm dev            # Vite 开发服务器，默认 http://localhost:5173
pnpm build          # run-p type-check build-only（先类型检查再构建）
pnpm type-check     # vue-tsc --build（仅类型检查）
pnpm build-only     # vite build（跳过类型检查的构建）
pnpm preview        # Vite 预览构建产物

# LLM 服务 (llm)
cd llm
pnpm dev            # nest start --watch --env-file .env（端口 3030）
pnpm build          # nest build

# 后端服务 (backend)
cd backend
pnpm dev            # nest start --watch（端口 3000）
pnpm build          # nest build
pnpm test           # jest（单元测试）
pnpm test:e2e       # jest --config ./test/jest-e2e.json（端到端测试）
pnpm lint           # eslint "{src,apps,libs,test}/**/*.ts" --fix
pnpm format         # prettier --write "src/**/*.ts" "test/**/*.ts"

# 共享类型包 (packages/shared)
cd packages/shared
pnpm build          # tsc -p tsconfig.json
```

## 架构

```
agent-project-app/
├── frontend/pc/       # Vue 3 + Vite + Element Plus + TailwindCSS v4（PC 端）
├── llm/               # NestJS v11 + LangChain/LangGraph（AI Agent 服务，端口 3030）
├── backend/           # NestJS v11 + TypeORM + better-sqlite3（通用后端，端口 3000）
└── packages/shared/   # 共享 TypeScript 类型（RestfulAPIResponse<T> 等）
```

### 前端架构要点

- 路由：[frontend/pc/src/router/index.ts](frontend/pc/src/router/index.ts) — Vue Router 5，`/` 下嵌套 Layout 布局，当前仅 `/chat` 子路由
- 布局：[frontend/pc/src/pages/layout/index.vue](frontend/pc/src/pages/layout/index.vue) — 顶部导航 + 可折叠侧边栏菜单 + `<router-view/>` 主内容
- HTTP 层：[frontend/pc/src/shared/request.ts](frontend/pc/src/shared/request.ts) — axios 实例，baseURL 为 `/llm`，拦截器自动解包 `response.data`；导出 `get/post/put/del` 泛型方法，返回值类型为 `RestfulAPIResponse<T>`
- Vite 代理：`/llm` → `http://localhost:3030`（见 [vite.config.ts](frontend/pc/vite.config.ts)），运行时所有 `/llm/*` 请求转发到 llm 服务
- 样式：TailwindCSS v4 + Less（Less 全局注入 `@/styles/variables.less`），Element Plus 组件主题色定义在 variables.less 中
- 请求测试用例：[frontend/pc/src/shared/__tests__/request.test.ts](frontend/pc/src/shared/__tests__/request.test.ts) 包含类型级别断言（编译期验证）

### LLM 服务架构要点

- 入口：[llm/src/main.ts](llm/src/main.ts) — NestJS + ConfigService 读取 `.env`，默认端口 3030
- Chat 模块：[llm/src/module/chat/](llm/src/module/chat/) — controller 暴露 `GET /chat/stream`，service 使用 LangChain/LangGraph 创建 Agent，checkpointer 使用 SQLite（`@langchain/langgraph-checkpoint-sqlite`）
- LLM 配置：通过 `LLM_BASE_URL`、`LLM_API_KEY`、`LLM_MODEL` 环境变量配置，当前使用 DeepSeek
- NestJS 版本：v11（CommonJS 模式），装饰器需要 `experimentalDecorators: true` + `emitDecoratorMetadata: true`

### Backend 服务架构要点

- 入口：[backend/src/main.ts](backend/src/main.ts) — NestJS v11，默认端口 3000
- 依赖 `@nestjs/axios` (HttpModule) 和 `better-sqlite3` + TypeORM
- 测试：Jest 30，配置文件在 package.json 的 `jest` 字段中

### 共享类型包 (packages/shared)

- `RestfulAPIResponse<T>`：`{ code: number; message: string; data: T }` — 所有 API 返回统一的 Restful 格式
- 前端和 llm 服务都通过 `@agent-project-app/shared` 引用
- CommonJS 模块，需要先 `cd packages/shared && pnpm build` 编译后其他项目才能使用

## 技术栈要点

| 层 | 技术 |
|---|---|
| 框架 | NestJS v11（后端/LLM）、Vue 3.5（前端） |
| 构建 | Vite 8（前端）、Nest CLI（后端/LLM） |
| 样式 | TailwindCSS v4 + Less（Element Plus 主题） |
| AI | LangChain v1 + LangGraph v1（LLM 服务） |
| 数据库 | better-sqlite3 + TypeORM（backend）、SQLite checkpoint（llm） |
| 类型系统 | TypeScript 5.7~6.0 strict 模式（全栈） |
| 包管理 | pnpm 10，workspace 协议 |

## 注意事项

- **环境变量**：llm 服务依赖 `.env` 文件（`llm/.env`），启动前必须存在
- **共享包构建**：修改 `packages/shared` 后需要在 shared 目录 `pnpm build`，否则其他 workspace 包会读取过时的 dist
- **模块系统混用**：llm 和 backend 使用 `type: commonjs`（Node.js），前端使用 `type: module`（Vite），配置项需区分处理
- **TypeScript 版本**：根项目使用 TS 6.0，backend 使用 TS 5.7，不可混用
- **前端请求路径**：前端 axios baseURL 为 `/llm`，Vite 开发代理将其转发到 `localhost:3030`，因此前端请求应使用 `/chat` 而非 `/llm/chat`
