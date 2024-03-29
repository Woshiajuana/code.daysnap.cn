# CSS 选择器有哪些？

## 选择器

### 基本选择器

- 通用选择器

```css
* {
  // ...
}
```

- 元素选择器

```css
p {
  // ...
}
```

- 类选择器

```css
.box {
  // ...
}
```

- id 选择器

```css
#title {
  // ...
}
```

- 属性选择器

```css
a[title] {
  // ...
}
```

### 分组选择器

```css
div,
span {
  // ...
}
```

### 组合器

- 后代组合器

```css
div span {
  // ...
}
```

- 直接子代组合器

```css
ul > li {
  // ...
}
```

- 一般兄弟组合器

```css
// p ~ span 匹配同一父元素下，<p> 元素后的所有 <span> 元素
p ~ span {
  // ...
}
```

- 紧邻兄弟组合器

```css
h2 + p {
  // ...
}
```

- 列组合器 <Badge type="danger">实验性</Badge>

```css
col||td {
  // ...
}
```

### 伪选择器

- 伪类

```css
// a:visited 匹配所有曾被访问过的 <a> 元素。
a:visited {
  // ...
}
```

- 伪元素

```css
p::after {
  // ...
}
```

## 优先级权重

一个选择器的优先级可以说是由三个不同的值（或分量）相加，可以认为是百（ID）十（类）个（元素）——三位数的三个位数：

- ID：选择器中包含 ID 选择器则百位得一分。
- 类：选择器中包含类选择器、属性选择器或者伪类则十位得一分。
- 元素：选择器中包含元素、伪元素选择器则个位得一分。

## 参考

- [MDN](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_selectors)
