import { defineConfig } from 'vitepress'

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
          text: '入门',
          items: [
            { text: '快速开始', link: '/guide/getting-started' },
            { text: 'Markdown 扩展', link: '/guide/markdown' }
          ]
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
