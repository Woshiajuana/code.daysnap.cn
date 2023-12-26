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


## 示例

::: sandbox {template=static entry=/src/index.html}
```css /src/index.css
.parent{
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: table-cell; 
  vertical-align: middle;
  /* text-align: center; */
}
.child{
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-color: red;
}
```
```html index.html  [active]
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="./src/index.css">
</head>
<body>
  <div class="parent">
    <div class="child"></div>
  </div>
</body>
</html>
```
:::