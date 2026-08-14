import { defineConfig } from 'vitepress'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 自动扫描 guide 目录生成侧边栏，新增文章无需手动配置
function getGuideSidebar() {
  const guideDir = path.join(__dirname, '../guide')
  if (!fs.existsSync(guideDir)) return []
  return fs
    .readdirSync(guideDir)
    .filter((f) => f.endsWith('.md') && !f.startsWith('index'))
    .sort()
    .map((f) => {
      const slug = f.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(guideDir, f), 'utf-8')
      const title = raw.match(/^---\s*\n[\s\S]*?\n---/) // frontmatter
        ? raw.match(/^title:\s*(.+)$/m)?.[1]?.trim()
        : undefined
      return { text: title || slug, link: `/guide/${slug}` }
    })
}

export default defineConfig({
  title: '知识库',
  description: '基于 VitePress + Decap CMS 的知识库',
  lastUpdated: true,
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/getting-started' },
      { text: '管理后台', link: '/admin/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: getGuideSidebar()
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ],

    footer: {
      message: '基于 VitePress + Decap CMS 构建',
      copyright: 'Copyright © 2026'
    },

    outline: {
      label: '本页目录'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    lastUpdated: {
      text: '最后更新于'
    },

    search: {
      provider: 'local'
    }
  }
})
