# 清除浮动的方式有哪些？

## clear: both

```css
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
```

`clear: both` 虽然叫清除浮动，但是实际上是令设置了该样式的元素视左右的浮动标签为标准流元素，同理可得 `clear: left` 和 `clear: right` 分别是视左/右的元素为未脱标的元素
