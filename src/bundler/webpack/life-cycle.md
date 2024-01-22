# 说一说 webpack 生命周期

## 初始化阶段钩子

- `entryOption`：允许插件修改入口文件配置
- `afterPlugins`：所有插件实例化后调用，但还未开始任何真正编译工作

## 编译构建阶段钩子

- `beforeRun`：在编译器开始读取记录前调用，这是非常早期的阶段
- `beforeCompile`：一个新的编译创建之后触发，但在这个编译实际开始之前
- `compile`：一个新的编译创建之后触发
- `thisCompilation`：当编译创建一个新的 `compilation` 对象时触发，该对象负责此次构建的资产和变化
- `compilation`：在每个新的 `在每个新的compilation创建时触发，它是compiler对象的每次运行的编译实例。` 创建时触发，它是 `compiler` 对象的每次运行的编译实例
- `make`：开始编译时触发，表明依赖开始构建
- `afterCompile`：编译完成时触发，但在输出阶段之前

## 输出阶段钩子

- `emit`：在生成资源到 `output` 目录之前触发，此时可以更改最终输出的资源或文件名
- `afterEmit`：在输出文件到目录之后触发

## 其他钩子

- `shouldEmit`：返回一个布尔值，指示是否应该继续执行输出阶段。
- `done`：编译完成，但在 `afterEmit` 之后的所有加载器都已执行完毕。
- `failed`：编译失败时触发。
- `invalid`：当监视模式文件更改时触发，但在重新编译之前。
- `watchRun`：在监视模式下开始一个新的编译时触发。

## 参考

- [揭秘 Webpack：打包技术深度解析](https://juejin.cn/post/7326414660486742068?searchId=2024012214563857D3D659BDBD14DF0357)
