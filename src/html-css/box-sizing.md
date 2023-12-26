# CSS 盒模型

在 `html` 中，所有元素都可以看做是一个盒子。

## 盒子的组成

- 内容（content）
- 内边距（padding）
- 边框（border）
- 外边距（margin）

## 盒子的类型

- 标准盒模型：在指定 width 和 height 属性时，设置的是内容区域的宽度和高度，`width = content`。

```css
.box {
  box-sizing: content-box;
}
```

- IE 盒模型：在指定 width 和 height 属性时，将边框和内边距的宽度和高度纳入到元素的总宽度和总高度之中，`width = content + padding + border`。

```css
.box {
  box-sizing: border-box;
}
```

## 示例

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.content-box {
  box-sizing: content-box;
  color: #fff;
  width: 100px;
  height: 100px;
  border: 10px solid #ddd;
  background-color: blue;
  padding: 10px;
  font-size: 12px;
}
.border-box {
  box-sizing: border-box;
  color: #fff;
  width: 100px;
  height: 100px;
  background-color: red;
  border: 10px solid #ddd;
  padding: 10px;
  font-size: 12px;
}
```

```html index.html  [active]
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./src/index.css" />
  </head>
  <body>
    <div class="content-box">content-box (100 * 100)</div>
    <br />
    <div class="border-box">border-box (100 * 100)</div>
  </body>
</html>
```

:::
