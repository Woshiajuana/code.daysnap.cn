# 什么是事件捕获、事件冒泡？

DOM 事件流分为三个阶段：

- 事件捕获阶段

- 事件目标阶段

- 事件冒泡阶段

![图](/assets/20240127231111.png)

## 事件捕获

当触发 `dom` 事件时，浏览器会从根节点开始由外到内进行事件传播。如果父元素通过事件捕获方式注册了对应的事件的话，会先触发父元素绑定的事件。

阻止事件捕获：

```js
el.addEventListener(
  "click",
  function (event) {
    // 后续捕获、冒泡事件也不会执行
    event.stopPropagation();
  },
  true
);
```

## 事件冒泡 (event bubbling)

事件会从最内层的元素开始发生，一直向上传播，直到 `document` 对象。

阻止事件冒泡：

```js
el.addEventListener("click", function (event) {
  event.stopPropagation();
});
```

## addEventListener

```
element.addEventListener(event, function, useCapture)
```

- `useCapture`：可选。布尔值，指定事件是否在捕获或冒泡阶段执行。 可能值:true - 事件句柄在捕获阶段执行（即在事件捕获阶段调用处理函数）false- false- 默认。事件句柄在冒泡阶段执行（即表示在事件冒泡的阶段调用事件处理函数）

## 结论

- 所有的事件类型都会经历事件捕获但是只有部分事件会经历事件冒泡阶段,例如 submit 事件就不会被冒泡。

- 事件的冒泡是可以阻止的

- `z-index` 堆叠的元素只有最上面的元素会触发事件

- 被点击的元素事件触发属于事件目标阶段，不属于事件冒泡阶段，如果用 `addEventListener` 给元素添加事件并指定事件冒泡阶段执行，那么点击它本身不会触发，必须点击它的子元素才能触发事件

## 参考

- [事件捕捉，事件冒泡，事件代理，阻止事件冒泡，阻止默认事件](https://blog.csdn.net/weixin_44580139/article/details/119344431)
