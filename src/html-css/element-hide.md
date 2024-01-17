# 隐藏一个元素的方法有哪些？

- `display: none`：隐藏元素，会改变页面布局，在布局中不再占有原有分配的空间，触发回流和重绘

- `opacity: 0`：隐藏元素，不会改变页面布局，如果这个元素绑定了一些事件，点击也会触发事件

- `visibility: hidden`：隐藏元素，不会改变页面布局，不会触发元素绑定的事件，会触发重绘

- 利用`position: absolute` 或者 `position: fixed` 等定位，将元素移动在页面之外。

- `transform: scale(0)`：使得无法看到，不会改变页面布局

- `z-index` 设置负值

- `clip/clip-path` 裁切元素隐藏
