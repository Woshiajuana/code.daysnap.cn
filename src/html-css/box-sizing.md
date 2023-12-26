# CSS 盒模型

在 `html` 中，所有元素都可以看做是一个盒子。

## 盒子的组成

- 内容（content）
- 内边距（padding）
- 边框（border）
- 外边距（margin）

## 类型

- 标准盒模型：在指定 width 和 height 属性时，设置的是内容区域的宽度和高度。

```css
.box {
  box-sizing: content-box;
}
```

- IE 盒模型：在指定 width 和 height 属性时，将边框和内边距的宽度和高度纳入到元素的总宽度和总高度之中。

```css
.box {
  box-sizing: border-box;
}
```
