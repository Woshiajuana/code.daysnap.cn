# TypeScript 核心面试题

对应大纲：[outline.md](./outline.md) 的 `2.2 TypeScript`。

## 1. 基础类型、联合类型、交叉类型、字面量类型、类型收窄

### 1.1 TypeScript 解决了什么问题？

TypeScript 是 JavaScript 的类型增强版本。它不会改变 JavaScript 的运行时能力，主要在开发阶段提供静态类型检查、代码提示、重构能力和接口约束。

面试中可以这样回答：

- TypeScript 是 JavaScript 的超集
- 提供静态类型检查与强大的开发体验
- 编译后产出纯净、高效的 JavaScript
- 核心价值是提升大型项目的可维护性和开发效率

```text
TypeScript 的核心价值不是让代码写得更复杂，而是在大型项目里把隐式约定显式化。它能提前发现类型错误，也能让接口、组件 Props、业务模型、状态结构更清晰，降低多人协作和长期维护成本。
```

### 1.2 基础类型有哪些？

常见基础类型：

```ts
let name: string = 'Alice';
let age: number = 18;
let visible: boolean = true;
let empty: null = null;
let notDefined: undefined = undefined;
let id: symbol = Symbol('id');
let big: bigint = 100n;
```

数组：

```ts
const list1: number[] = [1, 2, 3];
const list2: Array<number> = [1, 2, 3];
```

元组：

```ts
const point: [number, number] = [10, 20];
const user: [id: number, name: string] = [1, 'Alice'];
```

对象：

```ts
const user: { id: number; name: string } = {
  id: 1,
  name: 'Alice',
};
```

函数：

```ts
function add(a: number, b: number): number {
  return a + b;
}

const minus: (a: number, b: number) => number = (a, b) => a - b;
```

### 1.3 any、unknown、never、void 的区别

`any` 表示放弃类型检查：

```ts
let value: any = 1;

value.foo.bar();
```

`unknown` 表示未知类型，使用前必须收窄：

```ts
let value: unknown = 'hello';

if (typeof value === 'string') {
  value.toUpperCase();
}
```

`void` 常用于函数没有返回值：

```ts
function log(message: string): void {
  console.log(message);
}
```

`never` 表示永远不会出现的值，常见于抛错函数或穷尽检查：

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

穷尽检查：

```ts
type Status = 'loading' | 'success' | 'error';

function render(status: Status) {
  switch (status) {
    case 'loading':
      return '加载中';
    case 'success':
      return '成功';
    case 'error':
      return '失败';
    default: {
      const exhaustive: never = status;
      return exhaustive;
    }
  }
}
```

面试建议：

- 能不用 `any` 就不用。
- 外部输入、接口返回、`JSON.parse` 更适合先用 `unknown`，校验后再使用。
- `never` 常用来保证分支覆盖完整。

### 1.4 联合类型是什么？

联合类型表示一个值可以是多个类型之一。

```ts
type ID = string | number;

function getDetail(id: ID) {
  return String(id);
}
```

常见于接口状态：

```ts
type RequestState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: User }
  | { status: 'error'; error: Error };
```

这种写法比多个可选字段更安全：

```ts
type BadState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: User;
  error?: Error;
};
```

因为 `BadState` 无法表达 `success` 时一定有 `data`，`error` 时一定有 `error`。

### 1.5 交叉类型是什么？

交叉类型表示把多个类型合并成一个类型。

```ts
type Base = {
  id: number;
  createdAt: string;
};

type User = Base & {
  name: string;
};

const user: User = {
  id: 1,
  createdAt: '2026-01-01',
  name: 'Alice',
};
```

常见用途：

- 给业务对象追加基础字段。
- 组合多个能力类型。
- 扩展组件 Props。

需要注意，同名字段类型冲突可能得到 `never`：

```ts
type A = { id: string };
type B = { id: number };
type C = A & B;

// C['id'] 是 never
```

### 1.6 字面量类型是什么？

字面量类型是具体值本身作为类型。

```ts
type Size = 'small' | 'medium' | 'large';
type Code = 200 | 400 | 500;
type Enabled = true;
```

组件 Props 中非常常见：

```ts
type ButtonProps = {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
};
```

`as const` 可以让对象属性保持字面量类型：

```ts
const routes = {
  home: '/',
  user: '/user',
} as const;

type RouteKey = keyof typeof routes;
```

### 1.7 类型收窄是什么？

类型收窄是通过判断逻辑，把宽泛类型缩小为更具体的类型。

`typeof`：

```ts
function format(value: string | number) {
  if (typeof value === 'string') {
    return value.trim();
  }

  return value.toFixed(2);
}
```

`instanceof`：

```ts
function getTime(value: Date | string) {
  if (value instanceof Date) {
    return value.getTime();
  }

  return new Date(value).getTime();
}
```

`in`：

```ts
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function speak(animal: Cat | Dog) {
  if ('meow' in animal) {
    animal.meow();
  } else {
    animal.bark();
  }
}
```

判别联合：

```ts
type Result =
  | { type: 'success'; data: string }
  | { type: 'error'; message: string };

function handle(result: Result) {
  if (result.type === 'success') {
    return result.data;
  }

  return result.message;
}
```

自定义类型守卫：

```ts
type User = {
  id: number;
  name: string;
};

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  );
}
```

## 2. interface 与 type 的区别和适用场景

### 2.1 interface 和 type 都能做什么？

它们都可以描述对象结构：

```ts
interface UserByInterface {
  id: number;
  name: string;
}

type UserByType = {
  id: number;
  name: string;
};
```

也都可以扩展：

```ts
interface Admin extends UserByInterface {
  role: string;
}

type Guest = UserByType & {
  expiredAt: string;
};
```

### 2.2 interface 的特点

`interface` 更适合描述对象、类和公共 API。

可以重复声明并自动合并：

```ts
interface Window {
  appVersion: string;
}

interface Window {
  appName: string;
}
```

适合：

- 对象结构。
- 类实现约束。
- 第三方库类型扩展。
- 需要声明合并的场景。

类实现接口：

```ts
interface StorageLike {
  get(key: string): string | null;
  set(key: string, value: string): void;
}

class LocalStorageService implements StorageLike {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set(key: string, value: string) {
    localStorage.setItem(key, value);
  }
}
```

### 2.3 type 的特点

`type` 更灵活，可以表达联合类型、交叉类型、元组、条件类型、映射类型等。

```ts
type ID = string | number;
type Point = [number, number];
type Nullable<T> = T | null;
type UserKeys = keyof User;
```

适合：

- 联合类型。
- 交叉类型。
- 工具类型。
- 函数类型。
- 复杂类型运算。

函数类型：

```ts
type RequestHandler = (url: string, params?: object) => Promise<unknown>;
```

### 2.4 面试中如何回答区别？

可以这样回答：

```text
interface 更偏向对象结构和面向对象的契约，支持声明合并，也适合定义公共 API 和类实现。type 更像类型别名，表达能力更强，可以定义联合类型、交叉类型、元组、条件类型等。实际项目里，如果是稳定的对象模型或组件 Props，我会优先考虑 interface；如果需要组合、联合或类型计算，会使用 type。
```

## 3. 泛型：泛型函数、泛型组件、泛型约束、默认泛型

### 3.1 泛型是什么？

泛型是把类型当作参数传入，让函数、类、接口、组件在保持类型安全的同时具备复用能力。

没有泛型时：

```ts
function identity(value: any): any {
  return value;
}
```

问题是入参和返回值之间的类型关系丢失。

使用泛型：

```ts
function identity<T>(value: T): T {
  return value;
}

const name = identity('Alice'); // string
const age = identity(18); // number
```

### 3.2 泛型函数

请求函数：

```ts
async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

type User = {
  id: number;
  name: string;
};

const user = await request<User>('/api/user/1');
```

数组工具函数：

```ts
function first<T>(list: T[]): T | undefined {
  return list[0];
}
```

### 3.3 泛型接口

```ts
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

type UserResponse = ApiResponse<User>;
```

分页接口：

```ts
interface PageResult<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}
```

### 3.4 泛型约束

泛型约束用于限制类型参数必须满足某些条件。

```ts
function getLength<T extends { length: number }>(value: T): number {
  return value.length;
}

getLength('hello');
getLength([1, 2, 3]);
```

使用 `keyof` 约束字段：

```ts
function getValue<T extends object, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = {
  id: 1,
  name: 'Alice',
};

const name = getValue(user, 'name');
```

### 3.5 默认泛型

默认泛型可以降低调用成本。

```ts
interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

const response: ApiResponse = {
  code: 0,
  message: 'ok',
  data: {},
};
```

### 3.6 React 泛型组件

表格组件是泛型非常典型的场景：

```tsx
type Column<T> = {
  title: string;
  dataIndex: keyof T;
  render?: (value: T[keyof T], record: T) => React.ReactNode;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T | ((record: T) => string);
};

function Table<T extends object>(props: TableProps<T>) {
  return null;
}
```

使用时：

```tsx
type User = {
  id: string;
  name: string;
  age: number;
};

<Table<User>
  data={users}
  rowKey="id"
  columns={[
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
  ]}
/>;
```

### 3.7 Vue 泛型场景

Vue 中泛型常用于组合函数、请求封装、表单模型。

```ts
import { ref } from 'vue';

function useRequest<T>(request: () => Promise<T>) {
  const data = ref<T | null>(null);
  const loading = ref(false);

  async function run() {
    loading.value = true;

    try {
      data.value = await request();
    } finally {
      loading.value = false;
    }
  }

  return {
    data,
    loading,
    run,
  };
}
```

Vue 3.3 以后也可以更方便地写泛型组件：

```vue
<script setup lang="ts" generic="T extends Record<string, unknown>">
defineProps<{
  list: T[];
  labelKey: keyof T;
}>();
</script>
```

## 4. 工具类型

### 4.1 Partial

`Partial<T>` 把所有属性变成可选。

```ts
type User = {
  id: number;
  name: string;
  age: number;
};

type UpdateUserDTO = Partial<User>;
```

适合更新接口、表单草稿：

```ts
function updateUser(id: number, payload: Partial<User>) {
  return request(`/api/users/${id}`, payload);
}
```

### 4.2 Required

`Required<T>` 把所有属性变成必填。

```ts
type FormDraft = {
  name?: string;
  age?: number;
};

type SubmitForm = Required<FormDraft>;
```

常用于提交前确保字段完整。

### 4.3 Pick

`Pick<T, K>` 从类型中挑选部分字段。

```ts
type UserPreview = Pick<User, 'id' | 'name'>;
```

适合列表页、卡片页等只需要部分字段的场景。

### 4.4 Omit

`Omit<T, K>` 从类型中排除部分字段。

```ts
type CreateUserDTO = Omit<User, 'id'>;
```

适合创建接口，不需要服务端生成的字段。

### 4.5 Record

`Record<K, T>` 创建键值类型。

```ts
type Role = 'admin' | 'editor' | 'guest';

const roleNameMap: Record<Role, string> = {
  admin: '管理员',
  editor: '编辑',
  guest: '访客',
};
```

优点是可以保证 key 覆盖完整：

```ts
const statusText: Record<'pending' | 'success' | 'error', string> = {
  pending: '处理中',
  success: '成功',
  error: '失败',
};
```

### 4.6 ReturnType

`ReturnType<T>` 获取函数返回值类型。

```ts
function createUser() {
  return {
    id: 1,
    name: 'Alice',
  };
}

type User = ReturnType<typeof createUser>;
```

常用于从工厂函数、Hooks、组合函数中提取类型。

```ts
function useUser() {
  return {
    user: null as User | null,
    reload() {},
  };
}

type UseUserReturn = ReturnType<typeof useUser>;
```

### 4.7 Parameters

`Parameters<T>` 获取函数参数类型组成的元组。

```ts
function search(keyword: string, page: number) {
  return Promise.resolve([]);
}

type SearchParams = Parameters<typeof search>;
// [keyword: string, page: number]
```

适合复用函数参数类型：

```ts
function wrappedSearch(...args: Parameters<typeof search>) {
  console.log('before search');
  return search(...args);
}
```

### 4.8 常见补充工具类型

`Readonly<T>`：

```ts
type ReadonlyUser = Readonly<User>;
```

`Exclude<T, U>`：

```ts
type VisibleStatus = Exclude<'all' | 'active' | 'disabled', 'all'>;
```

`Extract<T, U>`：

```ts
type StringLike = Extract<string | number | boolean, string | boolean>;
```

`NonNullable<T>`：

```ts
type SafeUser = NonNullable<User | null | undefined>;
```

`Awaited<T>`：

```ts
type UserResult = Awaited<ReturnType<typeof fetchUser>>;
```

## 5. 高级类型：条件类型、映射类型、模板字面量类型、infer

### 5.1 条件类型

条件类型类似类型层面的三元表达式。

```ts
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

常见用途是根据输入类型返回不同结果。

```ts
type ApiData<T> = T extends Promise<infer R> ? R : T;
```

### 5.2 条件类型的分布式特性

当条件类型作用于联合类型时，会自动分发。

```ts
type ToArray<T> = T extends unknown ? T[] : never;

type Result = ToArray<string | number>;
// string[] | number[]
```

如果不想分发，可以用元组包裹：

```ts
type ToArrayNoDistribute<T> = [T] extends [unknown] ? T[] : never;

type Result = ToArrayNoDistribute<string | number>;
// (string | number)[]
```

### 5.3 映射类型

映射类型可以遍历对象的 key 并生成新类型。

```ts
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};
```

实现只读：

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

去掉可选：

```ts
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};
```

重映射 key：

```ts
type Getter<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type UserGetter = Getter<{
  name: string;
  age: number;
}>;
```

### 5.4 模板字面量类型

模板字面量类型可以基于字符串拼接生成新类型。

```ts
type Direction = 'top' | 'right' | 'bottom' | 'left';
type PaddingKey = `padding-${Direction}`;
```

事件名约束：

```ts
type EventName<T extends string> = `on${Capitalize<T>}`;

type ButtonEvents = EventName<'click' | 'hover'>;
// onClick | onHover
```

业务场景：

```ts
type Module = 'user' | 'order';
type Action = 'create' | 'delete';

type Permission = `${Module}:${Action}`;

const permission: Permission = 'user:create';
```

### 5.5 infer

`infer` 用于在条件类型中推断某一部分类型。

提取数组元素：

```ts
type ElementOf<T> = T extends Array<infer U> ? U : never;

type Item = ElementOf<string[]>;
```

提取 Promise 结果：

```ts
type UnwrapPromise<T> = T extends Promise<infer R> ? R : T;
```

提取函数返回值：

```ts
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
```

提取函数参数：

```ts
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
```

### 5.6 高级类型面试表达

可以这样回答：

```text
高级类型的价值是把运行时的一些结构约束提前到类型层。比如用映射类型生成表单字段状态，用模板字面量类型约束权限字符串，用条件类型和 infer 从接口函数中提取返回值。我的原则是类型要服务可维护性，如果类型写得比业务还难懂，就需要收敛复杂度。
```

## 6. 类型设计能力

### 6.1 API 返回值建模

通用响应结构：

```ts
interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
  traceId?: string;
}
```

分页结构：

```ts
interface PageQuery {
  page: number;
  pageSize: number;
}

interface PageResult<T> {
  page: number;
  pageSize: number;
  total: number;
  list: T[];
}
```

业务接口：

```ts
interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'disabled';
  createdAt: string;
}

type UserListResponse = ApiResponse<PageResult<User>>;
```

请求函数：

```ts
async function getUserList(query: PageQuery): Promise<UserListResponse> {
  return request('/api/users', query);
}
```

更推荐把 `request` 封装成直接返回 `data`：

```ts
async function requestData<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  const result = (await response.json()) as ApiResponse<T>;

  if (result.code !== 0) {
    throw new Error(result.message);
  }

  return result.data;
}

const page = await requestData<PageResult<User>>('/api/users');
```

### 6.2 接口状态建模

用判别联合描述状态机：

```ts
type RemoteData<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

使用：

```ts
function renderUser(state: RemoteData<User>) {
  switch (state.status) {
    case 'idle':
      return '未加载';
    case 'loading':
      return '加载中';
    case 'success':
      return state.data.name;
    case 'error':
      return state.error.message;
  }
}
```

这种方式比多个布尔值更清晰：

```ts
type BadState<T> = {
  loading: boolean;
  data?: T;
  error?: Error;
};
```

### 6.3 表单模型设计

基础表单值：

```ts
interface UserFormValues {
  name: string;
  email: string;
  roleIds: string[];
  enabled: boolean;
}
```

表单错误：

```ts
type FormErrors<T> = Partial<Record<keyof T, string>>;

const errors: FormErrors<UserFormValues> = {
  name: '请输入姓名',
};
```

表单字段配置：

```ts
type FieldType = 'input' | 'select' | 'switch';

type FormField<T> = {
  name: keyof T;
  label: string;
  type: FieldType;
  required?: boolean;
};

const fields: FormField<UserFormValues>[] = [
  { name: 'name', label: '姓名', type: 'input', required: true },
  { name: 'enabled', label: '启用', type: 'switch' },
];
```

更严格的字段值约束：

```ts
type FormFieldConfig<T, K extends keyof T = keyof T> = {
  name: K;
  label: string;
  defaultValue?: T[K];
};
```

### 6.4 权限模型设计

用模板字面量类型约束权限字符串：

```ts
type Resource = 'user' | 'order' | 'product';
type Operation = 'create' | 'read' | 'update' | 'delete';

type Permission = `${Resource}:${Operation}`;

const permission: Permission = 'user:create';
```

角色权限：

```ts
type Role = 'admin' | 'editor' | 'viewer';

const rolePermissions: Record<Role, Permission[]> = {
  admin: ['user:create', 'user:read', 'user:update', 'user:delete'],
  editor: ['product:create', 'product:read', 'product:update'],
  viewer: ['order:read'],
};
```

权限判断：

```ts
function hasPermission(
  permissions: Permission[],
  permission: Permission,
): boolean {
  return permissions.includes(permission);
}
```

### 6.5 组件 Props 设计

基础 React Props：

```tsx
type ButtonVariant = 'primary' | 'default' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
```

互斥 Props：

```ts
type LinkButtonProps = {
  href: string;
  onClick?: never;
};

type ActionButtonProps = {
  href?: never;
  onClick: () => void;
};

type SmartButtonProps = {
  children: React.ReactNode;
} & (LinkButtonProps | ActionButtonProps);
```

Vue Props：

```ts
type ButtonProps = {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
};
```

```vue
<script setup lang="ts">
withDefaults(defineProps<ButtonProps>(), {
  type: 'default',
  size: 'medium',
  loading: false,
  disabled: false,
});
</script>
```

设计原则：

- 对外 API 尽量稳定。
- Props 名称要贴近业务语义。
- 能用字面量联合就少用裸字符串。
- 用判别联合表达互斥状态。
- 不要为了炫技写过度复杂的类型。

## 7. 工程实践

### 7.1 tsconfig 常见配置

示例：

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    },
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

关键配置：

- `target`：编译目标语法版本。
- `module`：模块输出格式。
- `moduleResolution`：模块解析策略，现代 Vite 项目常用 `Bundler`。
- `strict`：开启严格模式，推荐开启。
- `noImplicitAny`：禁止隐式 any。
- `strictNullChecks`：严格检查 null 和 undefined。
- `baseUrl`、`paths`：路径别名。
- `skipLibCheck`：跳过第三方声明文件检查，加快构建。
- `noEmit`：只类型检查，不输出文件，常用于前端项目。

### 7.2 类型声明文件

声明文件通常使用 `.d.ts`。

声明全局变量：

```ts
declare const APP_VERSION: string;
```

声明模块：

```ts
declare module '*.svg' {
  const src: string;
  export default src;
}
```

声明 CSS Modules：

```ts
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}
```

扩展全局对象：

```ts
declare global {
  interface Window {
    __APP_CONFIG__: {
      apiBaseUrl: string;
    };
  }
}

export {};
```

### 7.3 第三方库类型补充

如果第三方库没有类型，可以安装：

```bash
npm install -D @types/lodash
```

如果没有现成类型，可以自己声明：

```ts
declare module 'legacy-lib' {
  export function init(options: { container: HTMLElement }): void;
}
```

如果第三方库类型不完整，可以通过模块扩展补充：

```ts
declare module 'some-lib' {
  interface Options {
    traceId?: string;
  }
}
```

实践建议：

- 不要长期用 `declare module 'xxx';` 直接把库变成 any。
- 关键业务依赖要补准确类型。
- 对老旧库可以先补最小可用类型，再逐步完善。

### 7.4 渐进式迁移

从 JavaScript 迁移到 TypeScript 时，不建议一次性全量重写。

推荐步骤：

- 先引入 TypeScript 编译环境。
- 开启 `allowJs`，允许 JS 和 TS 共存。
- 从工具函数、请求层、状态模型等低风险模块开始迁移。
- 新文件默认使用 `.ts` 或 `.tsx`。
- 对核心接口和业务模型优先建模。
- 逐步开启 `strict` 相关配置。
- 用 ESLint 约束 `any` 的使用。

迁移配置示例：

```json
{
  "compilerOptions": {
    "allowJs": true,
    "checkJs": false,
    "strict": false,
    "noEmit": true
  },
  "include": ["src"]
}
```

逐步增强：

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

### 7.5 TypeScript 和构建工具的关系

在现代前端项目中，TypeScript 常常分为两个职责：

- 类型检查：由 `tsc --noEmit` 或框架插件完成。
- 代码转译：由 Vite、esbuild、SWC、Babel 完成。

所以有些项目构建很快，是因为构建阶段只擦除类型，并没有完整类型检查。CI 中最好单独跑类型检查：

```bash
npm run typecheck
```

常见脚本：

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit"
  }
}
```

### 7.6 项目中的类型治理

建议建立这些规则：

- 新代码默认使用 TypeScript。
- `any` 必须有理由，优先使用 `unknown`。
- 接口返回值和核心状态必须建模。
- 公共组件 Props 必须明确类型。
- 复杂类型需要适度注释。
- 避免把类型体操暴露给业务代码。
- CI 中必须执行类型检查。

## 8. 高频面试题

### 8.1 any 和 unknown 的区别？

`any` 会绕过类型检查，任何操作都可以做。`unknown` 表示未知类型，使用前必须先做类型收窄。实际项目中，外部输入更适合用 `unknown`，校验后再转成具体类型。

### 8.2 type 和 interface 怎么选？

对象模型和公共 API 可以优先使用 `interface`，复杂类型组合、联合类型、工具类型可以使用 `type`。团队内部最好统一规范，避免风格混乱。

### 8.3 泛型的价值是什么？

泛型能保留输入和输出之间的类型关系，让函数、组件、接口在复用时仍然保持类型安全。例如请求封装、表格组件、表单组件都适合用泛型。

### 8.4 never 有什么用？

`never` 表示不可能出现的类型。常用于抛错函数、无限循环函数和联合类型的穷尽检查，可以帮助我们在新增状态后及时发现遗漏分支。

### 8.5 TypeScript 会影响运行时吗？

类型本身不会影响运行时，TypeScript 最终会被编译成 JavaScript。它主要在开发阶段和构建阶段提供类型检查。运行时的数据校验仍然需要自己做，或者使用 zod、yup 等库。

### 8.6 如何给后端接口做类型设计？

先定义通用响应结构，再定义业务实体、查询参数、分页结构和具体接口返回值。请求封装最好使用泛型，让调用方明确指定返回数据类型，并在必要时补充运行时校验。

### 8.7 大型项目如何治理 TypeScript？

可以从 `strict`、类型边界、接口建模、组件 Props、CI 类型检查、any 约束几个方面治理。目标不是追求复杂类型，而是让类型成为团队协作和长期维护的工具。

## 9. 面试表达建议

回答 TypeScript 题目时，不要只背概念，可以按这个结构：

- 先解释概念：这个类型或能力是什么。
- 再说明价值：它解决什么工程问题。
- 补一个例子：接口、表单、组件、权限、状态管理。
- 最后讲边界：什么时候不该过度使用。

示例：

```text
泛型的价值是保留类型之间的关系。比如请求函数里，调用方传入 User 类型，返回值就能被推断成 Promise<User>；表格组件里，columns 的 dataIndex 可以被约束为数据项的 key。这样组件仍然通用，但使用时不会丢失类型安全。我一般会在请求封装、组合函数、表格表单这类复用场景中使用泛型。
```
