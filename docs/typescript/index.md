# TypeScript 常见面试题

本文按难度从容易到困难整理 TypeScript 常见面试题，适合用于复习路线、面试准备和题库扩展。

## 一、基础题

### 1. TypeScript 是什么？它和 JavaScript 有什么关系？

TypeScript 是 JavaScript 的超集，在 JavaScript 基础上增加了静态类型系统。TypeScript 代码最终会被编译成 JavaScript，在浏览器或 Node.js 中运行。

常见回答要点：

- TypeScript 不改变 JavaScript 的运行时本质
- TypeScript 在开发阶段提供类型检查、代码提示和重构能力
- TypeScript 更适合中大型项目和多人协作

### 2. TypeScript 的核心价值是什么？

核心价值是把隐式约定显式化，让接口、数据结构、函数入参和返回值更清晰。

面试中可以从几个角度回答：

- 提前发现类型错误
- 增强 IDE 提示和重构体验
- 提升代码可维护性
- 降低多人协作成本

### 3. TypeScript 常见基础类型有哪些？

常见基础类型包括：

```ts
let name: string = 'Tom';
let age: number = 18;
let visible: boolean = true;
let empty: null = null;
let notDefined: undefined = undefined;
let id: symbol = Symbol('id');
let big: bigint = 100n;
```

数组和元组：

```ts
const list: number[] = [1, 2, 3];
const names: Array<string> = ['a', 'b'];

const point: [number, number] = [10, 20];
```

### 4. `any` 和 `unknown` 有什么区别？

`any` 表示放弃类型检查，任何操作都可以通过编译。

```ts
let value: any = 1;
value.foo.bar();
```

`unknown` 表示未知类型，使用前必须先做类型收窄。

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  value.toUpperCase();
}
```

面试建议：

- 不确定外部数据类型时，优先使用 `unknown`
- `any` 适合临时迁移或确实无法描述类型的场景，但要尽量缩小范围

### 5. `void` 和 `never` 有什么区别？

`void` 表示函数没有返回值。

```ts
function log(message: string): void {
  console.log(message);
}
```

`never` 表示永远不会产生正常返回值，常见于抛错函数或无限循环。

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

`never` 也常用于联合类型的穷尽检查。

### 6. 什么是联合类型？

联合类型表示一个值可以是多个类型之一。

```ts
type ID = string | number;

function getDetail(id: ID) {
  return String(id);
}
```

联合类型常用于接口状态、组件 Props 和业务枚举。

### 7. 什么是交叉类型？

交叉类型表示把多个类型合并成一个类型。

```ts
type Base = {
  id: number;
};

type User = Base & {
  name: string;
};

const user: User = {
  id: 1,
  name: 'Tom',
};
```

### 8. `interface` 和 `type` 有什么区别？

常见区别：

- `interface` 更适合描述对象结构和类契约
- `type` 可以描述联合类型、交叉类型、元组、条件类型等更复杂类型
- `interface` 支持重复声明并自动合并
- `type` 不支持同名重复声明

示例：

```ts
interface User {
  id: number;
  name: string;
}

type ID = string | number;
type Point = [number, number];
```

面试建议：描述对象结构时二者都可以；需要联合类型、条件类型、工具类型组合时通常使用 `type`。

### 9. 什么是可选属性和只读属性？

可选属性用 `?` 表示。

```ts
type User = {
  id: number;
  name?: string;
};
```

只读属性用 `readonly` 表示。

```ts
type User = {
  readonly id: number;
  name: string;
};
```

`readonly` 只限制 TypeScript 类型层面的重新赋值，不代表运行时对象一定不可变。

### 10. 数组和元组有什么区别？

数组表示一组相同类型或兼容类型的元素。

```ts
const list: number[] = [1, 2, 3];
```

元组表示固定长度、固定位置类型的数组。

```ts
const user: [number, string] = [1, 'Tom'];
```

元组适合表达坐标、函数返回多个值、固定结构数据等场景。

## 二、进阶题

### 11. TypeScript 如何做类型收窄？

类型收窄是指通过条件判断把宽泛类型缩小成更具体的类型。

常见方式：

- `typeof`
- `instanceof`
- `in`
- 字面量判断
- 自定义类型守卫

```ts
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value.toFixed(2);
}
```

### 12. 什么是类型守卫？

类型守卫是用于帮助 TypeScript 判断具体类型的条件表达式或函数。

```ts
type Fish = {
  swim: () => void;
};

type Bird = {
  fly: () => void;
};

function isFish(value: Fish | Bird): value is Fish {
  return 'swim' in value;
}
```

关键点是返回类型里的 `value is Fish`，它会告诉 TypeScript 判断成功后 `value` 的具体类型。

### 13. 什么是字面量类型？

字面量类型表示值只能是某个具体字面量。

```ts
type Direction = 'left' | 'right' | 'top' | 'bottom';

function move(direction: Direction) {
  return direction;
}
```

字面量类型常和联合类型一起使用，用来约束固定选项。

### 14. 什么是可辨识联合类型？

可辨识联合类型是通过一个公共字段区分不同分支的联合类型。

```ts
type State =
  | { status: 'loading' }
  | { status: 'success'; data: string[] }
  | { status: 'error'; error: Error };

function render(state: State) {
  switch (state.status) {
    case 'loading':
      return '加载中';
    case 'success':
      return state.data.join(',');
    case 'error':
      return state.error.message;
  }
}
```

它比多个可选字段更安全，因为每种状态都有明确的数据结构。

### 15. `as const` 有什么作用？

`as const` 会让 TypeScript 把值推断为更窄的字面量类型，并把对象属性和数组变成只读。

```ts
const config = {
  method: 'GET',
  timeout: 3000,
} as const;
```

此时 `method` 的类型是 `'GET'`，不是 `string`。

### 16. 泛型是什么？解决什么问题？

泛型表示把类型作为参数传入，让函数、类、接口在保持类型安全的同时具备复用能力。

```ts
function identity<T>(value: T): T {
  return value;
}

const name = identity('Tom');
const age = identity(18);
```

泛型常用于列表、接口返回、组件 Props、工具函数和数据模型。

### 17. 泛型约束是什么？

泛型约束用于限制泛型必须满足某种结构。

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength('hello');
getLength([1, 2, 3]);
```

没有约束时，TypeScript 不知道 `T` 上是否一定存在 `length` 属性。

### 18. `keyof` 和索引访问类型是什么？

`keyof` 可以获取对象类型的键集合。

```ts
type User = {
  id: number;
  name: string;
};

type UserKey = keyof User; // 'id' | 'name'
```

索引访问类型可以获取某个属性对应的类型。

```ts
type UserName = User['name']; // string
```

二者经常配合泛型使用：

```ts
function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
```

### 19. `typeof` 在类型系统中有什么作用？

在类型位置中，`typeof` 可以从变量值推导出类型。

```ts
const user = {
  id: 1,
  name: 'Tom',
};

type User = typeof user;
```

注意：类型系统中的 `typeof` 和运行时判断中的 `typeof` 使用场景不同。

### 20. 常见内置工具类型有哪些？

常见工具类型：

- `Partial<T>`：把属性变成可选
- `Required<T>`：把属性变成必选
- `Readonly<T>`：把属性变成只读
- `Pick<T, K>`：选取部分属性
- `Omit<T, K>`：排除部分属性
- `Record<K, T>`：构造键值对象
- `ReturnType<T>`：获取函数返回值类型
- `Parameters<T>`：获取函数参数类型
- `Awaited<T>`：获取 Promise 解析后的类型

示例：

```ts
type User = {
  id: number;
  name: string;
  age: number;
};

type UserPreview = Pick<User, 'id' | 'name'>;
type UpdateUser = Partial<User>;
```

## 三、困难题

### 21. 条件类型是什么？

条件类型可以根据类型关系返回不同类型，形式类似三元表达式。

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<'hello'>; // true
type B = IsString<123>; // false
```

条件类型是实现复杂工具类型的基础。

### 22. 条件类型为什么会分发？

当条件类型作用于裸类型参数，并且传入联合类型时，会对联合类型的每个成员分别计算。

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>; // string[] | number[]
```

如果不想分发，可以用元组包裹。

```ts
type ToArrayNonDistributive<T> = [T] extends [unknown] ? T[] : never;

type Result = ToArrayNonDistributive<string | number>; // (string | number)[]
```

### 23. `infer` 有什么作用？

`infer` 用于在条件类型中声明待推断的类型变量。

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type Result = MyReturnType<() => string>; // string
```

常见用途：

- 提取函数返回值
- 提取 Promise 内部类型
- 提取数组元素类型
- 提取元组某一部分

### 24. 如何实现 `Partial<T>`？

```ts
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
```

这里用到了映射类型、`keyof` 和索引访问类型。

### 25. 如何实现 `Pick<T, K>`？

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

关键点是 `K extends keyof T`，保证只能选取对象中存在的键。

### 26. 如何实现 `Omit<T, K>`？

```ts
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

也可以使用键重映射实现：

```ts
type MyOmit2<T, K extends keyof any> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};
```

### 27. 如何实现 `Readonly<T>`？

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

如果要实现深层只读，需要递归处理对象属性。

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

实际项目中要注意函数、数组、日期对象等特殊情况。

### 28. 如何实现 `Awaited<T>`？

```ts
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T;

type Result = MyAwaited<Promise<Promise<string>>>; // string
```

它用于递归提取 Promise 最终解析出来的类型。

### 29. 如何实现数组元素类型提取？

```ts
type ElementOf<T> = T extends readonly (infer U)[] ? U : never;

type A = ElementOf<string[]>; // string
type B = ElementOf<readonly [1, 2, 3]>; // 1 | 2 | 3
```

这里使用 `readonly` 可以兼容普通数组和只读元组。

### 30. 如何实现联合类型转交叉类型？

```ts
type UnionToIntersection<U> =
  (U extends unknown ? (arg: U) => void : never) extends (arg: infer I) => void
    ? I
    : never;

type Result = UnionToIntersection<{ a: string } | { b: number }>;
// { a: string } & { b: number }
```

这个题目通常考察条件类型分发、函数参数逆变和 `infer`。

### 31. 如何理解 TypeScript 的协变、逆变和双向协变？

简化理解：

- 协变：子类型可以赋值给父类型，常见于返回值
- 逆变：父类型可以赋值给子类型，常见于函数参数
- 双向协变：为了兼容性放宽检查，某些场景既允许协变也允许逆变

函数类型中，开启 `strictFunctionTypes` 后，函数参数检查更严格。

```ts
type Animal = { name: string };
type Dog = { name: string; bark: () => void };

let animalHandler: (value: Animal) => void;
let dogHandler: (value: Dog) => void;

dogHandler = animalHandler;
```

原因是能处理 `Animal` 的函数，也能处理更具体的 `Dog`。

### 32. `never` 在类型运算中有什么特点？

`never` 是空联合类型，在联合类型中会被自动消除。

```ts
type A = string | never; // string
```

在条件类型分发中，如果传入 `never`，结果仍然是 `never`。

```ts
type IsString<T> = T extends string ? true : false;

type B = IsString<never>; // never
```

这也是很多高级类型题里的常见陷阱。

### 33. `any` 在类型运算中有什么特殊行为？

`any` 会污染类型推导，让类型检查变得不可靠。

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<any>; // boolean
```

面试中可以强调：`any` 会绕过类型系统，应该尽量缩小使用范围。

### 34. 如何实现一个类型安全的 `get` 函数？

```ts
function get<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: 'Tom',
};

const id = get(user, 'id'); // number
const name = get(user, 'name'); // string
```

核心是让 `key` 受 `keyof T` 约束，并用 `T[K]` 返回对应属性类型。

### 35. 如何实现类型安全的事件系统？

```ts
type EventMap = {
  login: { userId: number };
  logout: undefined;
};

function emit<K extends keyof EventMap>(name: K, payload: EventMap[K]) {
  return { name, payload };
}

emit('login', { userId: 1 });
emit('logout', undefined);
```

这种写法能保证事件名称和事件参数一一对应。

## 四、工程实践题

### 36. `tsconfig.json` 中常见配置有哪些？

常见配置：

- `target`：指定编译后的 JavaScript 版本
- `module`：指定模块系统
- `strict`：开启严格类型检查
- `noImplicitAny`：禁止隐式 `any`
- `strictNullChecks`：严格检查 `null` 和 `undefined`
- `esModuleInterop`：改善 CommonJS 和 ES Module 互操作
- `baseUrl` 和 `paths`：配置路径别名
- `skipLibCheck`：跳过声明文件检查以提升编译速度

面试建议：重点说明 `strict`、`strictNullChecks` 和路径别名。

### 37. 为什么推荐开启 `strict`？

`strict` 会开启一组更严格的类型检查，让潜在问题更早暴露。

收益：

- 减少隐式 `any`
- 更安全地处理 `null` 和 `undefined`
- 函数参数和返回值检查更严格
- 类型推导结果更可靠

如果是老项目，可以分阶段开启，不一定一次性迁移完成。

### 38. TypeScript 中如何处理接口返回数据？

常见做法：

- 为接口响应定义类型
- 对外部输入保持警惕，必要时配合运行时校验
- 不盲信后端返回结构

```ts
type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

type User = {
  id: number;
  name: string;
};

async function getUser(): Promise<ApiResponse<User>> {
  const response = await fetch('/api/user');
  return response.json();
}
```

注意：TypeScript 类型只在编译阶段生效，不能替代运行时数据校验。

### 39. TypeScript 类型和运行时校验有什么区别？

TypeScript 类型在编译阶段工作，运行时会被擦除。

```ts
type User = {
  id: number;
  name: string;
};
```

编译成 JavaScript 后，`User` 类型不存在。对于接口返回、用户输入、配置文件等外部数据，仍然需要运行时校验。

### 40. 如何给第三方库补充类型声明？

可以创建 `.d.ts` 声明文件。

```ts
declare module 'legacy-lib' {
  export function format(value: string): string;
}
```

也可以通过 `declare global` 扩展全局类型。

```ts
declare global {
  interface Window {
    appVersion: string;
  }
}

export {};
```

### 41. 什么是声明合并？

同名 `interface` 会自动合并。

```ts
interface User {
  id: number;
}

interface User {
  name: string;
}

const user: User = {
  id: 1,
  name: 'Tom',
};
```

声明合并常用于扩展第三方库类型或全局对象类型。

### 42. React 项目中 TypeScript 常见考点有哪些？

常见问题：

- 如何给组件 Props 定义类型
- `ReactNode`、`ReactElement`、`JSX.Element` 的区别
- 如何给事件对象定义类型
- 如何给 `useRef`、`useState`、`useReducer` 定义类型
- 如何写泛型组件

示例：

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
```

### 43. 如何减少项目中的 `any`？

常见策略：

- 优先使用 `unknown` 表示外部未知数据
- 为接口、状态、组件 Props 补充明确类型
- 使用泛型提升工具函数复用性
- 对复杂对象使用 `type` 或 `interface` 建模
- 对历史代码分阶段治理

不要为了消除 `any` 写出更难维护的复杂类型，类型设计也要服务于代码可读性。

### 44. TypeScript 编译后会保留类型信息吗？

不会。TypeScript 类型会在编译阶段被擦除，最终输出 JavaScript。

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

编译后大致会变成：

```js
function add(a, b) {
  return a + b;
}
```

因此 TypeScript 类型不能代替运行时逻辑和运行时校验。

### 45. TypeScript 面试中如何回答“类型越复杂越好吗”？

不是。类型系统的目标是让代码更安全、更清晰，而不是炫技。

好的类型设计应该满足：

- 能表达核心业务约束
- 能减少错误使用方式
- 能提升调用方体验
- 能被团队成员读懂和维护

如果一个类型过度复杂，导致开发者难以理解、编译变慢或维护困难，就应该考虑简化。

## 五、推荐复习顺序

1. 先掌握基础类型、联合类型、交叉类型、类型收窄
2. 再掌握泛型、`keyof`、`typeof`、索引访问类型
3. 然后学习工具类型、映射类型、条件类型和 `infer`
4. 最后结合 `tsconfig`、声明文件、框架项目和接口建模做工程实践

## 六、面试回答模板

回答 TypeScript 面试题时，可以按照这个结构：

1. 先给定义：这个概念是什么
2. 再说用途：它解决什么问题
3. 补一个例子：最好是项目场景
4. 最后讲边界：有什么注意事项或坑

例如回答 `unknown`：

```text
unknown 表示未知类型，比 any 更安全。它常用于接口返回、JSON.parse、第三方输入等不确定数据。使用 unknown 后，必须先通过 typeof、in、自定义类型守卫等方式收窄，才能访问具体属性或方法。这样能避免 any 绕过类型系统导致的问题。
```
