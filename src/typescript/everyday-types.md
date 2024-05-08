# 常见类型

- `string`

- `number`

- `boolean`

类型 `boolean` 本身实际上只是联合 `true` | `false` 的别名。

- `Arrays`

```ts
type A1 = Array<string>;

type A2 = string[];
```

- `any`

- `Functions` 函数类型

```ts
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

- `Object Types` 对象类型

```ts
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

- `Union Types` 联合类型

```ts
type U1 = string | number;
```
