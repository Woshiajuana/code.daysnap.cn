# 判断类型的方式？

## typeof

- `typeof` 操作符返回的是字符串类型；
- `typeof` 只能准确判断除 `null` 以外的基本数据类型；
- 引用数据类型，`typeof` 的判断结果均为 `object`，函数返回 `function`；

```js
typeof 1; // "number"
typeof true; // "boolean"
typeof "name"; // "string"
typeof undefined; // "undefined"
typeof Symbol(1); // "symbol"
typeof (() => {}); // "function"

typeof null; // "object"
```

## instanceof

判断数据是否是某个对象的实例，返回一个布尔值。其内部运行机制是判断在其原型链中能否找到该类型的原型

- `instanceof` 是判断某个变量是否为某个对象的实例；
- `instanceof` 可以检测所有能转换为实例对象的数据，所以对于 `null` 和 `undefined` 检测不了；
- 所有引用类型都是 `Object` 的实例；

## constructor

使用 `constructor` 可以查看目标构造函数，也可以进行数据类型判断。

- `constructor` 是查看自己的构造函数；
- `constructor` 可以检测所有能转换为实例对象的数据，所以不能判断 null 和 undefined ，因为这两个特殊类型没有对应的包装对象；

```js
console.log({} instanceof Object); // true

// Uncaught TypeError: Cannot read property 'constructor' of undefined
undefined.constructor === undefined; // 报错
null.constructor === null; // 报错
```

## Object.prototype.toString.call

它是类型判断的终极解决方案，工作中也是比较常用而且准确！！
方法是定义在 Object 的原型对象（Object.prototype）上的，Object 的每个实例化对象都可以共享 Object.prototype.toString() 方法；

```js
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(1); // "[object Number]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(); // "[object Undefined]"
Object.prototype.toString.call(new Date()); // "[object Date]"
Object.prototype.toString.call(/at/); // "[object RegExp]"
```

**注意**，可以定义 `Symbol.toStringTag` 属性，改变输出的结果：

```js
const obj = {
  [Symbol.toStringTag]: "Module",
};
Object.defineProperty(obj, Symbol.toStringTag, { value: "Module" });
Object.prototype.toString.call(obj); // '[object Module]'
```

## 参考

- [判断数据类型的方式有哪些（原理及优缺点）?](https://blog.csdn.net/qq_38290251/article/details/129936273)
