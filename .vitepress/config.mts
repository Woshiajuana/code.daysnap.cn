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
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端面试',
        items: [
          { text: 'Html & Css', link: '/html-css/' },
          { text: 'Js & Ts', link: '/js-ts/' },
          { text: 'Vue', link: '/vue/' },
          { text: 'React', link: '/react/' },
          { text: '打包工具', link: '/bundler/' },
          { text: '杂项', link: '/other/' },
        ]
      },
    ],

    // 侧边栏
    sidebar: {
      '/html-css/': [
        { text: '引导', link: '/html-css/' },
      ],
      '/js-ts/': [
        { text: '引导', link: '/js-ts/' },
      ],
      '/vue/': [
        { text: '引导', link: '/vue/' },
      ],
      '/react/': [
        { text: '引导', link: '/react/' },
      ],
      '/bundler/': [
        { text: '引导', link: '/bundler/' },
        {
          text: 'Webpack',
          collapsed: false,
          items: [
            { text: '引导', link: '/bundler/webpack/' },
          ]
        },
        {
          text: 'Vite',
          collapsed: false,
          items: [
            { text: '引导', link: '/bundler/vite/' },
          ]
        },
        {
          text: 'Gulp',
          collapsed: false,
          items: [
            { text: '引导', link: '/bundler/gulp/' },
          ]
        },
      ],
      '/other/': [
        { text: '引导', link: '/other/' },
        {
          text: '网络',
          collapsed: false,
          items: [
            { text: '引导', link: '/other/network/' },
          ]
        },
      ],
    },


    // 其他链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Woshiajuana/code.daysnap.cn' }
    ]
  },

  // markdown 设置
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
