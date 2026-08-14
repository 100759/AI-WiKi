# 快速开始

本知识库由 **VitePress** 生成静态站点，内容通过 **Decap CMS** 管理，部署在 **Cloudflare Pages** 上。

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 本地预览构建结果
pnpm preview
```

开发服务器默认运行在 `http://localhost:5173`。

## 编辑内容

有两种方式编辑内容：

### 1. 通过 CMS 后台

访问 `/admin/` 路径，使用 GitHub 账号登录后即可可视化编辑：

- 创建和编辑文章
- 上传图片
- 自动提交到 GitHub 仓库

### 2. 直接编辑 Markdown

所有内容存储在 `docs/` 目录下，可以直接用编辑器修改 `.md` 文件。

## 项目结构

```
docs/
├── .vitepress/config.mts   # VitePress 配置
├── public/admin/           # Decap CMS 配置
├── guide/                  # 指南文章
└── index.md                # 首页
```

## 部署

推送到 GitHub 后，Cloudflare Pages 会自动构建部署。也可手动部署：

```bash
npx wrangler pages deploy docs/.vitepress/dist --project-name knowledge-base
```
