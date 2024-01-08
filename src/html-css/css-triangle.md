# CSS 实现三角形

## border （常用）

不设置宽高，用边框大小控制三角型大小

```css
.triangle-top {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.triangle {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid blue;
  border-bottom: 50px solid orangered;
  border-left: 50px solid yellow;
}

.triangle-top {
  width: 0;
  height: 0;
  border-top: 50px solid red;
  border-right: 50px solid transparent;
  border-left: 50px solid transparent;
}

.triangle-top-right {
  width: 0;
  height: 0;
  border-top: 50px solid blue;
  /* border-left: 50px solid red; */
  border-right: 50px solid transparent;
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
    <div class="triangle"></div>
    <br />
    <div class="triangle-top"></div>
    <br />
    <div class="triangle-top-right"></div>
  </body>
</html>
```

:::

## linear-gradient

两色渐变，调为实色，一色透明

```css
.triangle {
  width: 100px;
  height: 100px;
  background: linear-gradient(
    45deg,
    deeppink,
    deeppink 50%,
    transparent 50%,
    transparent 100%
  );
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.triangle {
  width: 100px;
  height: 100px;
  background: linear-gradient(
    45deg,
    deeppink,
    deeppink 50%,
    transparent 50%,
    transparent 100%
  );
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
    <div class="triangle"></div>
  </body>
</html>
```

:::

## clip-path

裁剪多边型的方式，创建元素的可显示区域。区域内的部分显示，区域外的隐藏。

```css
.triangle {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.triangle {
  width: 100px;
  height: 100px;
  background-color: skyblue;
  clip-path: polygon(0 0, 0% 100%, 100% 50%);
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
    <div class="triangle"></div>
  </body>
</html>
```

:::
