# webpack 怎么优化打包速度

## 合理利用缓存

**注意**：缓存会缩短连续构建时间，增加初始构建时间

- `cache-loader`
- `HardSourceWebpackPlugin`
- `babel-loader` 的 `cacheDirectory`

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

## 优化 loader 配置

使用 Loader 时可以通过 `test` 、 `include` 、 `exclude` 三个配置项来命中 Loader 要应用规则的文件

## 优化 module.noParse 配置

`module.noParse`  配置项可以让 `Webpack` 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。 原因是一些库，例如 `jQuery` `、ChartJS，` 它们庞大又没有采用模块化标准，让 `Webpack` 去解析这些文件耗时又没有意义。

```js
{
  module: {
    noParse: /jquery/,
    // ...
  }
}
```

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

## 参考

- [玩转 webpack，使你的打包速度提升 90%](https://juejin.cn/post/6844904071736852487)
