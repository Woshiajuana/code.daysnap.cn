# npm create 到底做了些啥

```sh
npm create vue@latest
```

- `npm init` 与 `npm create` 是等价的

- `npm init` 直接执行是初始化 `package.json`

- `npm init <tool>` 等同于 `npm create <tool>`会查找并运行一个名为 create-<tool> 的包
```sh
# 会查找名为 create-vue 的工具包，如果存在，会先去安装create-initializer这个包，然后再通过 `npm exec create-vue` 命令执行该包
npm create vue@latest
```