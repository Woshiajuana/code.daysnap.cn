# new 原理以及实现

## 原理

在使用 `new` 命名时，在构造函数内部依次执行下面的步骤：

1. 创建一个空对象，作为将要返回的对象；
2. 将这个空对象的原型指向构造函数的 `prototype` 属性，这一步的作用是让这个对象能沿着原型链去使用构造函数中的 `prototype` 上的方法；
3. 将这个空对象赋值给构造函数内部的 `this` 关键字，执行构造函数。这一步的作用是让构造器中设置在 `this` 上的属性最终设置在这个对象上；
4. 返回这个对象；

## 模拟实现

```js
function myNew(constructor, ...args) {
  // 创建一个新对象，将其原型设置为构造函数的原型
  const obj = Object.create(constructor.prototype);

  // 调用构造函数，并将新对象作为上下文
  const res = constructor.apply(obj, args);

  // 判断如果构造函数有显式的返回一个对象，则返回该对象 否则返回新对象
  return res instanceof Object ? res : obj;
}
```

其中代码中

```js
const obj = Object.create(constructor.prototype);
// 等同于
const obj = {};
obj.__proto__ = constructor.prototype;
```
