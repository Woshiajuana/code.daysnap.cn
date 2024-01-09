# instanceof 实现原理？

`instanceof` 运算符用于判断构造函数的 `prototype` 属性是否出现在对象的原型链中。

```js
const date = new Date();
console.log(date instanceof Date);
```

实现一个 `instanceof`

```js
function myInstanceOf(left, right) {
  // let proto = left.__proto__
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype;

  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到 就继续从其原型上找
    proto = Object.getPrototypeOf(left);
  }
}
```
