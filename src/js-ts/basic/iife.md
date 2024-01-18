# 什么是自执行函数(IIFE)？

IIFE 全称（Immediately-Invoked Function Expression），立即执行函数。


## 经典案例

用来封装模块

```js
;(function () {
  var name = 'module-a'

  function method1 () {
    // ...
  }

  function method2 () {
    // ...
  }

  window.moduleA = {
    method1,
    method2,
  }
})()
```