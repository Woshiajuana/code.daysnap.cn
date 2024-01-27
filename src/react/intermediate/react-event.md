# React 事件跟普通 HTML 事件的区别？

- 命名方式不一样，原生 `html` 事件全小写，`react` 采用小驼峰

- 事件函数处理语法不一样，原生事件为字符串，react 事件为函数

```html
<button onclick="test()"></button>
```

```jsx
<button onClick={test}></button>
```

- `react` 事件不能采用 `return false` 的方式来组织浏览器的默认行为，需要调用 `preventDefault()` 方法来组织默认行为

```html
<a href="#" onclick='console.log("The link was clicked."); return false;' />
```

```jsx
function test() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log("The link was clicked.");
  };

  return <a href="#" onClick={handleClick} />;
}
```

- `react` 的事件其实是一个合成事件，是对原生 `DOM` 事件的一个模拟：

  - 兼容浏览器、更好的跨平台
  - 将事件统一的存放在一个数组中，避免频繁的新增和删除，方便统一管理

- 事件执行顺序为原生 `html` 事件先执行，合成事件后执行，合成事件会冒泡绑定到 `document` 上
