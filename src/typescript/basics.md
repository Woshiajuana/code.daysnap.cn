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
- `never` 表示不可能出现的类型，一般用于穷尽检查，以及函数抛出异常
- `void` 表示无返回值类型，一般返回 `undefined` 或没有返回值的函数

## Interface 和 Type 的异同点

### 相同点

- 类型扩展
  + interface 通过 extends 扩展类型
  + type 通过交集扩展类型

### 不同点

- interface 只能用于声明对象的形状，不能用于重命名基本类型，声明的类型能被类实现
- type 类型别名可以定义基本类型、字面量类型、联合类型、交叉类型、元组等复杂类型
- interface 定义的类型可以重名，重名的类型会被声明合并
- type 定义的类型别名不能重名


## 一些特性

- TypeScript 只允许类型断言转换为更具体或更不具体的类型版本，这条规则可以防止诸如以下“不可能”的类型强制转换：
```ts
const x = "hello" as number; // error
```
- `as const` 可以将整个对象转换成类型字面量
- `never` 类型可以赋值给任何类型，但是除了 never 本身之外，没有任何类型可以赋值给 never

## 最佳实践

- 如果类型系统最终会推断出相同的类型，那最好不要添加注解
- 优先使用 interface 定义类型，直到需要使用类型别名特性时再使用 type 定义类型