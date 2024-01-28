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
  - 实现事件委托，避免大量创建事件监听
  - 将事件统一的存放在事件池中，避免频繁的新增和删除，方便统一管理（17+ 已经移出了事件池机制）

- 事件执行顺序为原生 `html` 事件先执行，合成事件后执行

- 因为 `React` 的事件不是挂载到 `jsx` 定义的 `DOM` 节点上，而是通过事件代理挂载到某个祖先节点上。`React 16.x` 及以前的版本这个祖先节点是 `document`，而 `React 17` 之后是根容器，也就是下面代码的 `rootNode。`

```jsx
const rootNode = document.getElementById("root");
ReactDOM.render(<App />, rootNode);
```

## 注意

- 并不是所有的事件都会委托到根容器，有些事件还是直接绑定到当前元素，比如 `img` 的 `load` 事件、`input` 的 `invalid` 事件、`video` 和 `audio` 的相关事件等。

- React 16.x 事件执行顺序

![图例](/assets/20240128224611.webp)

- React 17+ 事件执行顺序

![图例](/assets/20240128224612.webp)

- `React` 事件的 `capture` 阶段在原生事件 `capture` 开始时执行，然后是原生事件的 `capture` 阶段和原生事件的 `bubble` 阶段，最后是 `React` 事件的 `bubble` 阶段。

- `React 17` 移除了事件池机制

## 参考

- [深入学习 React 的合成事件](https://zhuanlan.zhihu.com/p/618639122)
