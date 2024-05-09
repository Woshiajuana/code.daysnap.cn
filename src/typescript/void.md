# 为什么返回非 void 的函数可分配给返回 void 的函数？

`void` 表示不返回值的函数的返回值。每当函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值时，它就是推断类型

返回类型为的 `void` 上下文类型不会强制函数不返回某些内容。另一种说法是具有 `void` 返回类型 （ `type voidFunc = () => void` ） 的上下文函数类型，在实现时可以返回任何其他值，但将被忽略。

```ts
type voidFunc = () => void;

const f1: voidFunc = () => {
  return true;
};

const f2: voidFunc = () => true;

const f3: voidFunc = function () {
  return true;
};
```

这样在实际代码中，会给节省很多

```ts
const src = [1, 2, 3];
const dst = [0];

src.forEach((el) => dst.push(el));
```

`void` 回调类型说 “我不会查看你的返回值，如果存在的话”。

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

## 参考

- https://github.com/Microsoft/TypeScript/wiki/FAQ#why-are-functions-returning-non-void-assignable-to-function-returning-void
