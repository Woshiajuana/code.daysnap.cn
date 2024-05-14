# 类初始化的顺序

```js
class Base {
  name = "base";
  constructor() {
    console.log("My name is " + this.name);
  }
}

class Derived extends Base {
  name = "derived";
}

// Prints "base", not "derived"
const d = new Derived();
```

根据 `JavaScript` 的定义，类初始化的顺序为：

- 基类字段已初始化

- 基类构造函数运行

- 初始化派生类字段

- 派生类构造函数运行

上面的示例：基类构造函数 `name` 在其自己的构造函数期间看到了自己的值，因为派生的类字段初始化尚未运行。
