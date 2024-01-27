# React 事件跟普通 HTML 事件的区别？

## 事件命名：

- `html` 全小写

```html
<button onclick="test()"></button>
```

- `react` 小驼峰

```jsx
<button onClick={test}></button>
```

## 组织浏览器本身默认行为