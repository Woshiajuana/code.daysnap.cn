# 枚举 enum 是什么？枚举和常量枚举的区别？

> 枚举是组织收集有关联变量的一种方式

使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。

```ts
enum Status {
  a,
  b,
  c,
}
```

## enum(枚举) 和 const enum(常量枚举)的区别

- 编译后不同
  - 常量枚举在编译阶段会被删除
  - 普通枚举并不会

```ts
const enum Demo1 {
  A = "a",
  B = "b",
}
enum Demo2 {
  A = "a",
  B = "b",
}
console.log("Demo1 A => ", Demo1.A);
console.log("Demo2 A => ", Demo2.A);
```

编译后

```js
var Demo2;
(function (Demo2) {
  Demo2["A"] = "a";
  Demo2["B"] = "b";
})(Demo2 || (Demo2 = {}));
console.log("Demo1 A => ", "a" /* Demo1.A */);
console.log("Demo2 A => ", Demo2.A);
```

- 常量枚举不支持动态计算，枚举内部的常量可以，因为枚举内部的常量支持自动推导

```ts
const x = 1;
const enum Demo3 {
  A = 1,
  B = A * 2, // 这里正常
  C = x * 3, // 这里报错 const enum member initializers can only contain literal values and other computed enum values.
}

enum Demo4 {
  A = 1,
  B = A * 2,
  C = x * 3,
}
```

## 代码参考

- https://github.com/Woshiajuana/ts-demo/tree/master/enum
