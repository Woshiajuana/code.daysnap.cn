# Narrowing 类型的收缩

```ts
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

在我们的 `if` 检查中，`typeof padding === "number"` 将其视为一种特殊形式的代码，称为类型保护。 `TypeScript` 遵循我们的程序可以用来分析给定位置值的最具体可能类型的可能执行路径。它着眼于这些特殊检查（称为类型保护）和赋值，并将类型细化为比声明的更具体类型的过程称为窄化(`Narrowing`)。

- `typeof` 类型保护器

```ts
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```

- `Truthiness narrowing` 真实性缩小

```ts
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

- `Equality narrowing` 平等缩小

```ts
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
    // (method) String.toUpperCase(): string
    y.toLowerCase();
    // (method) String.toLowerCase(): string
  } else {
    console.log(x);
    // (parameter) x: string | number
    console.log(y);
    // (parameter) y: string | boolean
  }
}
```

- `in` 运算符缩小范围

`in` 运算符：用于确定一个对象或其原型链上是否存在一个具有特定名称的属性。`TypeScript` 将此作为缩小潜在类型范围的一种方式。

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}
```

- `instanceof` 运算符缩小范围

`instanceof` 运算符用于检查一个值是否是另一个值的“实例”，具体用于判断构造函数的 `prototype` 属性是否出现在对象的原型链中

```ts
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
    // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());
    // (parameter) x: string
  }
}
```

- `Assignments` 赋值

```ts
let x = Math.random() < 0.5 ? 10 : "hello world!"; // x: string | number
x = 1;

console.log(x); // s: number

let x: number;
x = "goodbye!";

console.log(x); // s: string
```

- `Control flow analysis` 控制流分析

- `Using type predicates` 使用类型谓词

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// ---cut---
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

`pet is Fish` 是本例中的类型谓词。谓词采用 `parameterName is Type` 的形式是 ，其中 `parameterName` 必须是当前函数签名中的参数名称。

- `Assertion functions` 断言函数

## 参考

- https://www.typescriptlang.org/docs/handbook/2/narrowing.html
