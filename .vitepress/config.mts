import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Code",
  description: "code daysnap",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],
  lang: 'zh',
  base: '/',
  srcDir: './src',
  outDir: './.vitepress/dist', // 默认输出
  assetsDir: 'assets',
  lastUpdated: true, // 使用 Git 获取每个页面的最后更新时间戳
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端面试',
        items: [
          { text: 'HTML / CSS', link: '/item-1' },
          { text: 'JS / TS', link: '/item-2' },
          { text: 'Webpack / Vite / Gulp', link: '/markdown-examples' }
        ]
      },
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Woshiajuana/code.daysnap.cn' }
    ]
  },

  markdown: {
    // theme: 'material-theme-palenight',
    lineNumbers: true,

    // adjust how header anchors are generated,
    // useful for integrating with tools that use different conventions
    anchor: {
      slugify(str) {
        return encodeURIComponent(str)
      }
    }
  },
})
