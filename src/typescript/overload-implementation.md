# 重载签名和实现签名的区别？

先看示例代码

```ts
// @errors: 2575
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3); // error No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

- 在此示例中，我们编写了两个重载：一个接受一个参数，另一个接受三个参数。前两个签名称为 `重载签名`。

- 然后，我们编写了一个具有兼容签名的函数实现。函数具有实现签名，但不能直接调用此签名。

- 实现签名还必须与重载签名兼容。

**注意：** 编写重载函数时，在函数的实现上方应始终有两个或多个签名。

## 推荐

- 如果可能，请始终首选具有联合类型的参数而不是重载
