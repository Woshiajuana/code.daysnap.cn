# 文本溢出显示省略怎么处理？

## 单行文本溢出

```css
.single-line {
  overflow: hidden; // 溢出隐藏
  text-overflow: ellipsis; // 溢出显示省略号
  white-space: nowrap; // 不进行换行
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.single-line {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
    <p class="single-line">
      单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出单行文本溢出
    </p>
  </body>
</html>
```

:::

## 多行文本溢出

```css
.multiple-line {
  overflow: hidden; // 溢出隐藏
  text-overflow: ellipsis; // 溢出用省略号显示
  display: -webkit-box; // 作为弹性伸缩盒子模型显示
  -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
  -webkit-line-clamp: 3; // 限制显示的行数
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.multiple-line {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
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
    <p class="multiple-line">
      多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出多行文本溢出
    </p>
  </body>
</html>
```

此方法 `webkit` 浏览器都支持，其他小部分浏览器会有兼容性问题。

:::

## 利用伪元素兼容多行溢出

```css
.multiple-line {
  position: relative;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
}
.multiple-line:after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 5px;
  background-color: #fff;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.multiple-line {
  position: relative;
  line-height: 1.5em;
  height: 3em;
  overflow: hidden;
}
.multiple-line:after {
  content: "...";
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 5px;
  background-color: #fff;
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
    <p class="multiple-line">
      利用伪元素兼容多行溢出利用利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出利用伪元素兼容多行溢出
    </p>
  </body>
</html>
```
