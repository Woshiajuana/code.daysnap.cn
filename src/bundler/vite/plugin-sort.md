# 插件执行顺序

一个 `Vite` 插件可以额外指定一个 `enforce` 属性（类似于 webpack 加载器）来调整它的应用顺序。`enforce` 的值可以是 `pre` 或 `post` 。解析后的插件将按照以下顺序排列：

- `Alias`
- 带有 `enforce: 'pre'` 的用户插件
- `Vite` 核心插件
- 没有 `enforce` 值的用户插件
- `Vite` 构建用的插件
- 带有 `enforce: 'post'` 的用户插件
- `Vite` 后置构建插件（最小化，manifest，报告）
