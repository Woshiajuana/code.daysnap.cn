# 什么是 BFC ？

`BFC` 全称 `Block Formatting Context`，名为 `区块格式化上下文`。它是一个独立的渲染区域，让处于 `BFC` 内部的元素与外部的元素相互隔离，使内外元素不会相互影响。

## 主要效果

当一个元素触发了 `BFC` 外主要有以下的效果：

- 元素可以包裹内部的浮动元素
- 和外部的浮动元素进行隔离
- 抑制外边距折叠

## 常见创建 BFC 的方式

- 浮动元素（即 `float` 值不为 `none` 的元素）`float: left` 或 `float: right`

```css
.box {
  float: left;
}
```

- 绝对定位元素（`position` 值为 `absolute` 或 `fixed` 的元素）

```css
.box {
  position: absolute;
}
```

- 行内块元素（`display` 值为 `inline-block` 的元素）

```css
.box {
  display: inline-block;
}
```

- `overflow` 值不为 `visible` 或 `clip` 的块级元素

```css
.box {
  overflow: hidden;
}
```

- 弹性元素（`display` 值为 `flex` 或 `inline-flex` 元素的直接子元素），如果它们本身既不是弹性、网格也不是表格容器。

以上是常见创建 `BFC` 的方式，更多请参考 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

## 使用场景

- 去除外边距重叠现象
- 清除浮动
- 避免某元素被浮动元素覆盖
