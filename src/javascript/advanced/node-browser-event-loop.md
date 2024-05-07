# Nodejs 中 Event Loop 和浏览器中有什么区别？

## Nodejs 中的 Event Loop

`Nodejs` 利用 `libuv` 库负责 `Node API` 的执行。它将不同的任务分配给不同的线程，形成一个 `Event Loop`（事件循环），以异步的方式将任务的执行结果返回给 `V8` 引擎。

![nodejs event loop](/assets/1705562830132.png)

`libuv`库中，事件循环分为 6 个阶段

- `timers`：这个阶段执行 `timer`（`setTimeout`、`setInterval`）的回调

- `I/O callbacks`：处理一些上一轮循环中的少数未执行的 `I/O` 回调

- `idle / prepare`：仅 `node` 内部使用

- `poll`：获取新的 `I/O` 事件, 适当的条件下 `node` 将阻塞在这里

- `check`：执行 `setImmediate()` 的回调

- `close callbacks`：执行 `socket` 的 `close` 事件回调

## 差异

- 浏览器环境下，`microtask` 微任务队列是每个 `macrotask` 宏任务执行完之后执行

- `Nodejs`环境下，`microtask` 微任务会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 `microtask` 微任务队列的任务

```js
setTimeout(() => {
  console.log("timer1");
  Promise.resolve().then(function () {
    console.log("promise1");
  });
}, 0);
setTimeout(() => {
  console.log("timer2");
  Promise.resolve().then(function () {
    console.log("promise2");
  });
}, 0);
```

浏览器端运行结果：timer1 => promise1 => timer2 => promise2

`Node` 端(v10 以下版本)运行结果：timer1 => timer2 => promise1 => promise2

**注意**：`Node` v11 及以上版本已保持跟浏览器一致

## 参考

- [详解 JavaScript 中的 Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)
- [Node—关于 Event Loop 的学习笔记](https://blog.51cto.com/u_13382214/5779739)
