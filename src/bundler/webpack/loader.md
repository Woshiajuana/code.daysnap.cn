# 说说 loader 分类，优先级

- `pre` ：前置

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "loaderA",
      },
    ];
  }
}
```

- `normal` ：普通

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "loaderB",
      },
    ];
  }
}
```

- `inline` ：内联

```js
import a from "loaderC?q=1!./a.ja";
```

多个 `loader` 内联

```
import a from 'loaderC1!loaderC?q=1!./a.ja'
```

- `post` ： 后置

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        enforce: "post",
        test: /\.js$/,
        loader: "loaderD",
      },
    ];
  }
}
```

执行顺序：`pre > normal > inline > post`

相同优先级：`从右到左，从上到下`
