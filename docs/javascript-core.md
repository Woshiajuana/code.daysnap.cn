# JavaScript 核心面试题

对应大纲：[outline.md](./outline.md) 的 `2.1 JavaScript 核心`。

## 1. 执行上下文、作用域链、闭包、变量提升、暂时性死区

### 1.1 什么是执行上下文？

执行上下文是 JavaScript 代码执行时的运行环境。每当代码进入全局、函数或 `eval` 时，都会创建对应的执行上下文。

执行上下文主要包含：

- 变量环境：保存 `var`、函数声明等。
- 词法环境：保存 `let`、`const`、块级作用域等。
- this 绑定：决定当前代码中的 `this` 指向。
- 外部环境引用：用于形成作用域链。

常见类型：

- 全局执行上下文：代码启动时创建，浏览器中全局 `this` 通常指向 `window`。
- 函数执行上下文：函数调用时创建，调用结束后出栈。
- eval 执行上下文：不推荐使用。

### 1.2 什么是作用域链？

作用域链是变量查找的链路。当前作用域找不到变量时，会沿着外层词法作用域继续查找，直到全局作用域。

示例：

```js
const name = 'global';

function outer() {
  const name = 'outer';

  function inner() {
    console.log(name);
  }

  inner();
}

outer(); // outer
```

`inner` 在定义时就确定了外层词法环境，所以会访问到 `outer` 里的 `name`。

### 1.3 什么是闭包？

闭包是函数和它可以访问的外部词法环境的组合。即使外部函数已经执行完，内部函数仍然可以访问外部函数中的变量。

```js
function createCounter() {
  let count = 0;

  return function add() {
    count += 1;
    return count;
  };
}

const counter = createCounter();

counter(); // 1
counter(); // 2
```

闭包常见用途：

- 保存私有变量。
- 函数柯里化。
- 防抖、节流。
- 模块封装。
- React Hooks 中保留渲染时的状态快照。

闭包风险：

- 长期持有大对象可能造成内存无法释放。
- 循环中使用 `var` 容易产生共享变量问题。
- 在异步回调中可能读到旧变量，也就是常说的闭包陷阱。

### 1.4 什么是变量提升？

变量提升是指 JavaScript 在编译阶段会先处理声明。

`var` 声明会被提升并初始化为 `undefined`：

```js
console.log(a); // undefined
var a = 1;
```

函数声明会整体提升：

```js
foo(); // ok

function foo() {
  console.log('foo');
}
```

函数表达式不会整体提升：

```js
bar(); // TypeError: bar is not a function

var bar = function () {
  console.log('bar');
};
```

### 1.5 什么是暂时性死区？

`let` 和 `const` 也会被提升，但在声明语句执行之前不能访问，这段不可访问区域叫暂时性死区。

```js
console.log(a); // ReferenceError
let a = 1;
```

暂时性死区的意义是让变量必须先声明再使用，减少变量提升带来的不确定性。

## 2. 原型、原型链、继承方式、class 的本质

### 2.1 什么是原型？

每个函数都有 `prototype` 属性。通过构造函数创建的实例，会通过内部的 `[[Prototype]]` 指向构造函数的 `prototype`。

```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayName = function () {
  return this.name;
};

const p = new Person('Alice');

p.sayName(); // Alice
```

这里 `p` 本身没有 `sayName`，会沿着原型去 `Person.prototype` 上查找。

### 2.2 什么是原型链？

对象访问属性时，先查自身。如果自身没有，就沿着 `[[Prototype]]` 继续向上查找，直到 `null`。这条链就是原型链。

```js
p.__proto__ === Person.prototype; // true
Person.prototype.__proto__ === Object.prototype; // true
Object.prototype.__proto__ === null; // true
```

实际开发中不建议直接使用 `__proto__`，可以使用：

```js
Object.getPrototypeOf(p);
Object.setPrototypeOf(p, proto);
```

### 2.3 常见继承方式有哪些？

原型链继承：

```js
function Parent() {
  this.list = [];
}

function Child() {}

Child.prototype = new Parent();
```

缺点是引用类型属性会被所有实例共享。

构造函数继承：

```js
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}
```

缺点是无法复用父类原型上的方法。

组合继承：

```js
function Parent(name) {
  this.name = name;
}

Parent.prototype.sayName = function () {
  return this.name;
};

function Child(name) {
  Parent.call(this, name);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
```

缺点是父构造函数会执行两次。

寄生组合继承：

```js
function inherit(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
```

这是 ES5 中较理想的继承方式。

### 2.4 class 的本质是什么？

`class` 本质上是基于原型机制的语法糖。

```js
class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return this.name;
  }
}
```

等价理解为：

- `constructor` 对应构造函数。
- 类方法挂在 `Person.prototype` 上。
- `extends` 底层仍然基于原型链。
- `super` 用于调用父类构造函数或父类原型方法。

需要注意：

- `class` 声明不会像函数声明一样可在声明前调用。
- 类内部默认是严格模式。
- 类方法不可枚举。
- 必须通过 `new` 调用。

## 3. this 绑定规则

### 3.1 默认绑定

普通函数独立调用时，非严格模式下 `this` 指向全局对象，严格模式下是 `undefined`。

```js
function foo() {
  console.log(this);
}

foo();
```

### 3.2 隐式绑定

函数作为对象方法调用时，`this` 指向调用它的对象。

```js
const user = {
  name: 'Alice',
  sayName() {
    return this.name;
  },
};

user.sayName(); // Alice
```

隐式绑定容易丢失：

```js
const fn = user.sayName;

fn(); // this 不再指向 user
```

### 3.3 显式绑定

通过 `call`、`apply`、`bind` 显式指定 `this`。

```js
function say(age) {
  return `${this.name}-${age}`;
}

say.call({ name: 'Alice' }, 18);
say.apply({ name: 'Alice' }, [18]);

const boundSay = say.bind({ name: 'Alice' });
boundSay(18);
```

### 3.4 new 绑定

使用 `new` 调用构造函数时，会创建新对象，并让构造函数中的 `this` 指向这个新对象。

```js
function Person(name) {
  this.name = name;
}

const p = new Person('Alice');
```

`new` 的过程：

- 创建一个新对象。
- 新对象的原型指向构造函数的 `prototype`。
- 构造函数内部的 `this` 指向新对象。
- 如果构造函数返回对象，则返回该对象；否则返回新对象。

### 3.5 箭头函数的 this

箭头函数没有自己的 `this`，它的 `this` 来自定义时外层作用域。

```js
const user = {
  name: 'Alice',
  sayName: () => {
    return this.name;
  },
};

user.sayName(); // 通常不是 Alice
```

箭头函数不适合作为对象方法、构造函数、原型方法。适合作为回调函数，用来保留外层 `this`。

## 4. 事件循环

### 4.1 什么是事件循环？

JavaScript 主线程一次只能执行一个任务。事件循环负责协调同步代码、异步回调、渲染和任务队列。

浏览器中一次常见流程：

- 执行一个宏任务。
- 清空当前产生的所有微任务。
- 必要时执行渲染。
- 取下一个宏任务继续执行。

### 4.2 宏任务有哪些？

常见宏任务：

- `script` 整体代码。
- `setTimeout`。
- `setInterval`。
- `setImmediate`，主要在 Node.js 中。
- I/O。
- UI 事件。
- MessageChannel。

### 4.3 微任务有哪些？

常见微任务：

- `Promise.then`、`catch`、`finally`。
- `queueMicrotask`。
- `MutationObserver`。
- Node.js 中的 `process.nextTick`。

示例：

```js
console.log(1);

setTimeout(() => {
  console.log(2);
});

Promise.resolve().then(() => {
  console.log(3);
});

console.log(4);

// 1 4 3 2
```

### 4.4 浏览器渲染时机

浏览器通常会在一个宏任务执行完、微任务清空后，判断是否需要渲染。

如果微任务一直追加微任务，会阻塞页面渲染：

```js
function loop() {
  Promise.resolve().then(loop);
}

loop();
```

这类代码会让浏览器长期无法进入渲染阶段。

### 4.5 Node.js 事件循环有什么差异？

Node.js 的事件循环分为多个阶段：

- timers：执行 `setTimeout`、`setInterval`。
- pending callbacks：执行部分系统回调。
- poll：处理 I/O。
- check：执行 `setImmediate`。
- close callbacks：关闭回调。

Node.js 中 `process.nextTick` 优先级通常高于 Promise 微任务，要谨慎使用，避免阻塞事件循环。

## 5. Promise 原理、链式调用、错误穿透、async/await

### 5.1 Promise 的状态

Promise 有三种状态：

- pending：等待中。
- fulfilled：已成功。
- rejected：已失败。

状态只能从 pending 变为 fulfilled 或 rejected，变化后不可逆。

```js
const p = new Promise((resolve, reject) => {
  resolve(1);
});
```

### 5.2 then 为什么可以链式调用？

`then` 会返回一个新的 Promise。

```js
Promise.resolve(1)
  .then((value) => value + 1)
  .then((value) => {
    console.log(value); // 2
  });
```

链式调用的核心规则：

- `then` 回调返回普通值，下一个 `then` 接收这个值。
- 返回 Promise，下一个 `then` 等待该 Promise 状态。
- 抛出错误，下一个错误处理回调接收。

### 5.3 什么是错误穿透？

如果某个 `then` 没有提供错误处理函数，错误会继续向后传递，直到被 `catch` 捕获。

```js
Promise.reject(new Error('fail'))
  .then(() => {
    console.log('success');
  })
  .catch((error) => {
    console.log(error.message); // fail
  });
```

### 5.4 async/await 的本质是什么？

`async/await` 是 Promise 的语法糖，让异步代码写起来像同步代码。

```js
async function getUser() {
  try {
    const user = await fetchUser();
    return user;
  } catch (error) {
    console.error(error);
  }
}
```

需要注意：

- `async` 函数总是返回 Promise。
- `await` 后面如果是普通值，会被包装成 resolved Promise。
- `await` 会暂停当前 async 函数后续代码，把后续逻辑放入微任务。
- 并发请求不要误写成串行。

串行：

```js
const a = await requestA();
const b = await requestB();
```

并行：

```js
const [a, b] = await Promise.all([requestA(), requestB()]);
```

## 6. 高频手写题

### 6.1 实现 call

```js
Function.prototype.myCall = function (context, ...args) {
  context = context == null ? globalThis : Object(context);
  const key = Symbol('fn');

  context[key] = this;
  const result = context[key](...args);
  delete context[key];

  return result;
};
```

### 6.2 实现 apply

```js
Function.prototype.myApply = function (context, args = []) {
  context = context == null ? globalThis : Object(context);
  const key = Symbol('fn');

  context[key] = this;
  const result = context[key](...args);
  delete context[key];

  return result;
};
```

### 6.3 实现 bind

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const fn = this;

  function boundFn(...args) {
    const isNew = this instanceof boundFn;
    return fn.apply(isNew ? this : context, [...boundArgs, ...args]);
  }

  boundFn.prototype = Object.create(fn.prototype);
  return boundFn;
};
```

### 6.4 实现 new

```js
function myNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const result = Constructor.apply(obj, args);

  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result
    : obj;
}
```

### 6.5 实现 Promise.all

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    let count = 0;

    if (promises.length === 0) {
      resolve(result);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          count += 1;

          if (count === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
}
```

### 6.6 防抖

防抖是在事件频繁触发时，只执行最后一次。适合搜索输入、窗口 resize。

```js
function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

### 6.7 节流

节流是在一段时间内最多执行一次。适合滚动、拖拽、频繁点击。

```js
function throttle(fn, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();

    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}
```

### 6.8 深拷贝

```js
function deepClone(value, map = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  if (map.has(value)) {
    return map.get(value);
  }

  const result = Array.isArray(value) ? [] : {};
  map.set(value, result);

  Reflect.ownKeys(value).forEach((key) => {
    result[key] = deepClone(value[key], map);
  });

  return result;
}
```

说明：

- `WeakMap` 用于处理循环引用。
- `Reflect.ownKeys` 可以处理 Symbol key。
- 生产级深拷贝还需要额外处理 Date、RegExp、Map、Set、函数、DOM 节点等。

### 6.9 发布订阅

```js
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(type, handler) {
    if (!this.events.has(type)) {
      this.events.set(type, new Set());
    }

    this.events.get(type).add(handler);
  }

  off(type, handler) {
    this.events.get(type)?.delete(handler);
  }

  emit(type, ...args) {
    this.events.get(type)?.forEach((handler) => {
      handler(...args);
    });
  }

  once(type, handler) {
    const wrapper = (...args) => {
      handler(...args);
      this.off(type, wrapper);
    };

    this.on(type, wrapper);
  }
}
```

### 6.10 LRU 缓存

LRU 的核心是最近使用的数据放到前面，超过容量时删除最久未使用的数据。JavaScript 中可以用 `Map` 保持插入顺序。

```js
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    if (this.cache.size > this.capacity) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }
}
```

## 7. 模块化、循环依赖、Tree Shaking

### 7.1 CommonJS 和 ESM 有什么区别？

CommonJS：

- 主要用于 Node.js。
- 使用 `require` 和 `module.exports`。
- 运行时加载。
- 导出的是值的拷贝，但对象属性仍然是引用。

```js
const fs = require('fs');

module.exports = {
  name: 'demo',
};
```

ESM：

- JavaScript 官方模块标准。
- 使用 `import` 和 `export`。
- 编译时静态分析。
- 导出是 live binding，可以感知导出值变化。
- 支持 Tree Shaking。

```js
import { ref } from 'vue';

export const name = 'demo';
```

### 7.2 循环依赖怎么理解？

循环依赖是两个模块互相引用。

CommonJS 在循环依赖时，可能拿到的是对方尚未执行完成的导出对象。

ESM 因为是静态分析和 live binding，循环依赖表现更稳定，但如果在初始化前访问变量，仍然可能触发暂时性死区错误。

处理建议：

- 抽离公共逻辑到第三个模块。
- 减少模块初始化阶段的副作用。
- 避免在模块顶层执行复杂业务逻辑。
- 用依赖倒置降低互相引用。

### 7.3 Tree Shaking 的原理是什么？

Tree Shaking 是在打包阶段移除未使用代码。

它依赖：

- ESM 静态结构。
- 打包工具的依赖分析。
- 压缩工具的死代码删除。
- 包的 `sideEffects` 标记。

常见失效原因：

- 使用 CommonJS。
- 模块存在副作用。
- 动态导入路径过于复杂。
- 整包引入导致无法静态分析。

示例：

```js
import { debounce } from 'lodash-es';
```

通常比下面这种方式更利于 Tree Shaking：

```js
import _ from 'lodash';
```

## 8. 内存管理、垃圾回收、WeakMap、WeakSet

### 8.1 JavaScript 如何管理内存？

JavaScript 内存生命周期：

- 分配内存：创建变量、对象、函数。
- 使用内存：读写变量和对象。
- 释放内存：垃圾回收器回收不再使用的对象。

开发者不能直接控制垃圾回收，但可以避免保留无用引用。

### 8.2 垃圾回收常见算法

标记清除：

- 从根对象出发，标记所有可达对象。
- 没有被标记的对象被认为不可达，可以回收。
- 现代浏览器主要基于这个思路。

引用计数：

- 统计对象被引用的次数。
- 引用次数为 0 时回收。
- 问题是无法处理循环引用。

### 8.3 常见内存泄漏场景

- 全局变量长期持有大对象。
- 定时器未清理。
- 事件监听未解绑。
- 闭包长期持有无用数据。
- DOM 节点删除后仍被 JavaScript 引用。
- 缓存无限增长。
- 第三方库实例未销毁。

示例：

```js
function mount() {
  const node = document.querySelector('#app');

  window.addEventListener('resize', () => {
    console.log(node.clientWidth);
  });
}
```

如果组件卸载时没有移除监听，回调会继续持有 `node`，可能造成泄漏。

### 8.4 WeakMap 和 WeakSet 有什么特点？

`WeakMap` 的 key 必须是对象，并且是弱引用。如果 key 对象没有其他引用，垃圾回收时可以被回收。

```js
const map = new WeakMap();
let user = {};

map.set(user, 'info');
user = null;
```

当 `user` 对象没有其他强引用时，WeakMap 中对应记录可以被回收。

特点：

- 不可遍历。
- 不影响 key 对象的垃圾回收。
- 适合存储对象私有数据、DOM 关联数据、深拷贝循环引用记录。

`WeakSet` 类似，只存储对象弱引用，适合记录对象是否被访问过。

## 9. 面试表达建议

回答 JavaScript 核心题时，可以按这个结构表达：

- 先给定义：这个概念是什么。
- 再讲机制：底层大概如何工作。
- 然后讲场景：项目里在哪里用过。
- 最后讲坑点：有哪些边界和注意事项。

示例：

```text
闭包是函数和它能访问的外部词法环境的组合。它的关键点是函数定义时保存了外层作用域引用，所以外层函数执行结束后，内部函数仍然能访问外部变量。实际项目里我会用它做私有状态、函数缓存、防抖节流，也会注意不要让闭包长期持有大对象，避免内存泄漏。
```
