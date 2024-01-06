# webpack 怎么优化打包速度

##

## oneOf

当规则匹配时，只使用第一个匹配规则，提升构建速度，避免每个文件都被所有 `loader` 过一遍。

```js
{
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpe?g|gif|svg)$/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/images/[name][ext]',
            },
          },
        ]
      }
    ],
  },
}
```

## 缓存

实际开发中，主要是 `js` 打包占用打包时间，所以在使用 `babel-loader` 或者 `eslint` 的时候都会开启缓存

开启 `babel-loader` 缓存

```js
{
  test: /\.js$/,
  use: [
    {
      loader: "babel-loader",
      options: {
        cacheDirectory: true, // 开启 babel 缓存
        cacheCompression: false, // 关闭缓存文件压缩
      }
    }
  ]
}
```

开启 `eslint` 缓存

```js
{
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslint-cache"
      ),
    }),
  ];
}
```

## Thead 多进程

可以开启多进程打包。

**注意** 请仅在特别耗时的操作中使用，因为每个进程的启动就有大约 `600ms` 左右的开销。

1. 查看 `CPU` 核数

```js
const os = require("os");

const threads = os.cups().length;
```

2. 下载 `thread-loader`

```sh
npm install thread-loader -D
```

3. 使用

```js
{
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "thread-loader",
            options: {
              works: threads,
            },
          },
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启 babel 缓存
              cacheCompression: false, // 关闭缓存文件压缩
            },
          },
        ],
      },
    ];
  },

  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      cache: true,
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/eslint-cache"
      ),
      // 开启多进程和设置进程数量
      threads,
    }),

  ],

  optimization: {
    minimizer: [
      // webpack 5 推荐压缩类的插件 放这里使用
      // 压缩
      new TerserWebpackPlugin({
        // 开启多进程和设置进程数量
        parallel: threads,
      }),
    ]
  }
}
```
