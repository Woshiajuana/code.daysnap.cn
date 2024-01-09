# 让元素垂直水平居中的方法有哪些？

## flex 布局

```css
.parent {
  display: flex;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  align-items: center;
  justify-content: center;
}
.child {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  display: flex;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  align-items: center;
  justify-content: center;
}
.child {
  width: 100px;
  height: 100px;
  background-color: red;
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
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

:::

## `absolute` + `margin`

```css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  background-color: red;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  margin-top: -50px;
  margin-left: -50px;
  background-color: red;
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
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

:::

## `absolute` + `margin: auto`

```css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
  background-color: red;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100px;
  height: 100px;
  margin: auto;
  background-color: red;
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
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

:::

## `absolute` + `transform`

```css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-color: red;
  transform: translate3d(-50%, -50%, 0);
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  background-color: red;
  transform: translate3d(-50%, -50%, 0);
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
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

:::

## `line-height` + `text-align` 文本垂直居中

```css
.parent {
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border: 1px solid #ddd;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  width: 200px;
  height: 200px;
  line-height: 200px;
  text-align: center;
  border: 1px solid #ddd;
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
    <div class="parent">内容</div>
  </body>
</html>
```

:::

## table 布局

```css
.parent {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: table-cell;
  vertical-align: middle;
  /* text-align: center; */
}
.child {
  width: 100px;
  height: 100px;
  margin: 0 auto;
  background-color: red;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: table-cell;
  vertical-align: middle;
  /* text-align: center; */
}
.child {
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
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="./src/index.css" />
  </head>
  <body>
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

:::

## grid 布局

```css
.parent {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: grid;
  align-items: center;
  justify-content: center;
}
.child {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

::: sandbox {template=static entry=/src/index.html}

```css /src/index.css
.parent {
  width: 200px;
  height: 200px;
  border: 1px solid #ddd;
  display: grid;
  align-items: center;
  justify-content: center;
}
.child {
  width: 100px;
  height: 100px;
  background-color: red;
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
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```
