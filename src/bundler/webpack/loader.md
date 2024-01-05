# 说说 loader 分类，优先级

## 分类

- 同步 `loader`

```js 
module.exports = function (content, map, meta) {
  // ...
  return content;
};
```

也可以调用 `this.callback` 返回

```js
module.exports = function (content, map, meta) {
  // ...
  this.callback(null, content, map, meta);
  return;
};
```

- 异步 `loader`

```js
module.exports = function (content, map, meta) {
  const callback = this.async();
  setTimeout(() => {
    callback(null, content, map, meta);
  }, 1000);
};
```

- `Raw Loader`

默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。通过设置 raw 为 true，loader 可以接收原始的 Buffer。每一个 loader 都可以用 String 或者 Buffer 的形式传递它的处理结果。complier 将会把它们在 loader 之间相互转换。

```js
module.exports = function (content) {
  assert(content instanceof Buffer);
  return someSyncOperation(content);
  // 返回值也可以是一个 `Buffer`
  // 即使不是 "raw"，loader 也没问题
};
module.exports.raw = true;
```

- `Pitching Loader`

`loader` 总是 从右到左被调用。有些情况下，loader 只关心 request 后面的 元数据(metadata)，并且忽略前一个 loader 的结果。在实际（从右到左）执行 loader 之前，会先 从左到右 调用 loader 上的 pitch 方法。

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        //...
        use: ["a-loader", "b-loader", "c-loader"],
      },
    ],
  },
};
```

将会发生这些步骤：

```
|- a-loader `pitch`
  |- b-loader `pitch`
    |- c-loader `pitch`
      |- requested module is picked up as a dependency
    |- c-loader normal execution
  |- b-loader normal execution
|- a-loader normal execution
```

## 优先级

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
