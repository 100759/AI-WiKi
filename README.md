# 知识库 (VitePress + Decap CMS)

基于 **VitePress** 构建静态站点，**Decap CMS** 提供内容管理后台，内容存储在 **GitHub** 仓库，部署在 **Cloudflare Pages** 上。

## 功能

- VitePress 驱动的极速文档站点
- `/admin/` 路径下的可视化 CMS 后台
- GitHub OAuth 认证（通过 Cloudflare Pages Functions 代理）
- 内容变更自动提交到 GitHub 并触发重新部署

## 本地开发

```bash
pnpm install
pnpm dev          # 启动开发服务器 http://localhost:5173
```

## 构建

```bash
pnpm build        # 输出到 docs/.vitepress/dist
pnpm preview      # 本地预览构建结果
```

## 项目结构

```
├── docs/                      # VitePress 项目根
│   ├── .vitepress/config.mts  # VitePress 配置
│   ├── public/admin/          # Decap CMS（构建后原样复制到 dist/admin）
│   │   ├── index.html         # CMS 入口
│   │   └── config.yml         # CMS 配置
│   ├── guide/                 # 指南文章
│   └── index.md               # 首页
├── functions/api/             # Cloudflare Pages Functions（OAuth 代理）
│   ├── auth.js                # 重定向到 GitHub 授权
│   └── callback.js            # 交换 token 并传回 CMS
└── package.json
```

## 部署到 Cloudflare Pages

### 1. 创建 GitHub OAuth App

前往 GitHub → Settings → Developer settings → OAuth Apps → New OAuth App：

- **Homepage URL**: 你的站点地址（如 `https://knowledge-base.pages.dev`）
- **Authorization callback URL**: 同 Homepage URL

记下 **Client ID** 和 **Client Secret**。

### 2. 部署

```bash
npx wrangler pages deploy docs/.vitepress/dist --project-name knowledge-base
```

### 3. 配置环境变量

在 Cloudflare Dashboard → 你的 Pages 项目 → Settings → Environment variables 中添加：

- `GITHUB_CLIENT_ID` = 你的 OAuth Client ID
- `GITHUB_CLIENT_SECRET` = 你的 OAuth Client Secret

### 4. 更新 CMS 配置

编辑 `docs/public/admin/config.yml`，将 `<YOUR_SITE_URL>` 替换为实际部署地址，`<GITHUB_USER>/<REPO_NAME>` 替换为实际仓库路径，重新推送。

### 5. 访问 CMS

打开 `https://<你的域名>/admin/`，用 GitHub 账号登录即可管理内容。

## 技术说明

### 认证流程

由于 Cloudflare Pages 不支持 Netlify Identity / git-gateway，本项目使用 `github` 后端 + Cloudflare Pages Functions 作为 OAuth 代理：

1. CMS 点击登录 → 调用 `/api/auth` → 重定向到 GitHub 授权页
2. GitHub 授权后回调 `/api/callback` → 用 code 换取 access_token
3. 通过 `postMessage` 将 token 传回 CMS 窗口
4. CMS 用 token 直接调用 GitHub API 读写内容
