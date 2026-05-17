根据你 8 年经验前端的背景，以下 TypeScript 面试题侧重**类型编程、高级特性、工程实践**，适合用来考察对 TS 的深入理解。

## 基础与类型注解

1. `any`、`unknown`、`never`、`void` 的区别与使用场景？
2. `interface` 与 `type` 的异同点？何时用 `interface`，何时用 `type`？
3. 字面量类型与联合类型的组合如何使用？
4. 类型断言（`as`）与非空断言（`!`）的区别及风险？
5. 可选属性（`?`）与只读属性（`readonly`）的底层实现差异？

## 高级类型

6. 映射类型（`keyof`、`in`）如何实现一个 `Readonly<T>` 或 `Partial<T>`？
7. 条件类型（`T extends U ? X : Y`）的应用场景？举例说明 `Exclude<T, U>` 的实现原理。
8. `infer` 关键字的作用？如何用 `infer` 提取 Promise 内部的返回值类型？
9. 什么是模板字面量类型？可以用来做哪些类型安全的字符串操作？
10. 递归类型（例如深度 `Readonly` 或深度 `Partial`）如何编写？

## 泛型

11. 泛型约束 `<T extends SomeType>` 的意义与常见用法？
12. 泛型默认参数（`<T = string>`）有何用？与函数默认参数的区别？
13. 如何理解“泛型在编译时被擦除”？对运行时有什么影响？
14. 设计一个泛型工具类型 `DeepReadonly<T>`，使对象及其所有子属性变为只读。

## 类型守卫与类型缩小

15. `typeof`、`instanceof`、`in` 作为类型守卫的区别？
16. 自定义类型守卫（`value is Type`）如何编写？与断言函数（`asserts value is Type`）有何不同？
17. 可辨识联合（Discriminated Union）模式解决了什么问题？举例说明。
18. 使用 `is` 关键字时，什么情况下类型守卫会产生副作用或误判？

## 装饰器与实验性特性

19. TypeScript 装饰器（实验性）有几种类型？类装饰器、方法装饰器的执行顺序？
20. 开启 `experimentalDecorators` 和 `emitDecoratorMetadata` 分别做了什么？`Reflect.metadata` 的用途？
21. 参数装饰器与属性装饰器的实际应用场景（例如依赖注入、日志记录）？

## 模块与声明

22. `declare` 关键字用于什么场景？如何编写 `.d.ts` 声明文件？
23. `namespace` 与 ES Module 的区别？现在是否还推荐使用 `namespace`？
24. 如何让 TypeScript 识别非 TS 文件（例如 `.vue`、`.png`、`.css`）的类型？
25. `import type` 与普通 `import` 的区别？对编译后代码有何影响？

## 配置与工程化

26. `tsconfig.json` 中 `strict` 模式包含哪些具体选项？（例如 `strictNullChecks`、`noImplicitAny` 等）
27. `moduleResolution` 的 `node` 与 `nodenext` 有何区别？对解析 ESM 的影响？
28. `isolatedModules` 选项为什么重要？它与单文件编译（如 Babel、swc）的关系是什么？
29. `paths` 和 `baseUrl` 如何配合使用？与 Webpack/Vite 的 alias 有什么区别？
30. `outDir`、`rootDir`、`declarationDir` 的配置作用，如何生成 `.d.ts` 文件？

## 类型系统原理与陷阱

31. TypeScript 的类型系统是“结构类型系统”（Structural Typing）还是“名义类型系统”（Nominal Typing）？举例说明其实际影响。
32. 什么是“类型兼容性”？为什么 `{ a: number }` 可以赋值给 `{ a: number; b?: string }`？
33. `symbol` 作为属性名时，如何确保类型安全？
34. 索引签名（`[key: string]: any`）的潜在问题？如何用 `Record` 或 `Map` 替代？
35. 实现一个类型“字符串首字母大写”（例如 `Capitalize<T>`）的思路？

## 与 JavaScript 交互

36. 使用 `@ts-ignore` 与 `@ts-expect-error` 的区别？何时应使用后者？
37. 如何为没有类型定义的第三方库编写轻量级声明？什么是“环境模块声明”（`declare module 'lib'`）？
38. `allowJs` 和 `checkJs` 选项如何让 TS 检查 JS 文件？在渐进迁移中的策略？
39. 如何让一个 JS 文件被 TS 识别并生成类型？JSDoc 注释的常见标记（`@type`、`@param`、`@returns`）？

## 代码组织与模式

40. 在大型项目中如何组织 `.d.ts` 文件？`types` 与 `@types` 的优先级？
41. 抽象类与接口的异同？何时使用抽象类？
42. 实现一个类型安全的 EventBus，要求 on/emit 方法能根据事件名自动推断参数类型。
43. TypeScript 中函数重载的声明方式与实现逻辑？与联合类型参数相比有何优劣？
44. 如何利用 `const` 断言（`as const`）创建只读且字面量精确推断的对象？

## 性能与编译优化

45. `project references`（项目引用）是什么？如何用它提高大型 monorepo 的构建速度？
46. `incremental` 选项的作用？与 `tsc --build` 的区别？
47. 使用 `type` 导入（`import type`）能否减少编译产物大小？为什么？
48. `skipLibCheck` 的风险与收益？

以上问题基本覆盖了 TS 面试中从进阶到专家级别的常见考点。如果需要对某几道题进行详细解答或模拟追问，可以告诉我。