# 基础

- 练习题参考： https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md

## TypeScript 解决了什么问题？

- 是 Javascript 的超集
- 提供编译时静态类型检查和强大的开发体验
- 可以在编写代码时，提供错误信息和代码补全功能
- 编译后产出纯净、高效的 JavaScript
- 核心价值是提升大型项目的可维护性和开发效率

## TypeScript 的基本类型有哪些？

- string
- number
- boolean
- bigint
- symbol
- null
- undefined
- void
- never
- unknown
- any

## `any`、`unknown`、`never`、`void` 的区别与使用场景？

- `any` 表示任意类型，会关闭静态类型检查
- `unknown` 表示未知类型，在使用的时候需要进行逻辑判断，将类型收窄
- `never` 表示不可能出现的类型，一般用于函数抛出异常
- `void` 表示无返回值类型，一般返回 `undefined` 或没有返回值的函数


## 最佳实践

- 如果类型系统最终会推断出相同的类型，那最好不要添加注解
