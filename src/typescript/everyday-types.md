# 常见类型

- `string`

- `number`

- `boolean`

类型 `boolean` 本身实际上只是联合 `true` | `false` 的别名。

- `void`

`void` 表示不返回值的函数的返回值。每当函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值时，它就是推断类型

返回类型为的 `void` 上下文类型不会强制函数不返回某些内容。另一种说法是具有 `void` 返回类型 （ `type voidFunc = () => void` ） 的上下文函数类型，在实现时可以返回任何其他值，但将被忽略。

还有一种特殊情况需要注意，当文本函数定义具有 `void` 返回类型时，该函数不得返回任何内容。

```ts
function f2(): void {
  // @ts-expect-error
  return true;
}

const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```

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

- `object`

特殊类型 `object` 是指任何不是基元 （`string` 、 `number` 、 `bigint` 、 `boolean` 、 `symbol` 、 `null` 或 `undefined`） 的值。这与空对象类型 `{ }` 不同，也不同于全局类型 `Object` 。很可能你永远不会使用 `Object` .

`object` 不是 `Object` .始终使用 `object` ！

- `unknown`

`unknown` 类型表示任何值。这与 `any` 类型类似，但更安全，因为使用 `unknown` 值执行任何操作都是不合法的。

- `never`

该 `never` 类型表示从未观察到的值。在返回类型中，这意味着函数引发异常或终止程序的执行

- `Function`

全局类型 `Function` 描述 `JavaScript` 中所有函数值上存在的属性，如 `bind` 、 `call` 、 `apply` 和其他属性。它还具有始终可以调用类型 `Function` 值的特殊属性，这些调用返回 `any` 。
