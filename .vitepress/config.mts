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

  // 国际化
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
    }
  },
  
  // 主题设置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
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
      '/guide/': [
        { text: '引导', link: '/guide/' },
      ],
      '/html-css/': [
        { text: '引导', link: '/html-css/' },
        { text: 'CSS盒模型', link: '/html-css/box-sizing' },
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
    ],

    // 尾部
    footer: {
      message: '本文档由 <a href="https://www.daysnap.cn/">daysnap.cn</a> 整理',
      copyright: `Copyright © 2022-${new Date().getFullYear()} <a href="https://github.com/woshiajuana">Woshiajuana</a>`,
    },

    // 搜索
    search: {
      provider: 'algolia',
      options: {
        appId: '951JD102W2',
        apiKey: '673c50fe091bce7942453b63fe7a0747',
        indexName: 'code',
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            searchBox: {
              resetButtonTitle: '清除查询条件',
            },
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      },
    },

    outline: 'deep',
    outlineTitle: '本页目录',

    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    darkModeSwitchLabel: '外观',
    sidebarMenuLabel: '菜单',
    returnToTopLabel: '返回顶部',
    langMenuLabel: '选择语言',

    lastUpdated: {
      text: '最近更新时间',
    },
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

  // 网站 sitemap.xml
  sitemap: {
    hostname: 'https://code.daysnap.cn'
  }
})
