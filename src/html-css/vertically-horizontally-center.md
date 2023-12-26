# 让元素垂直水平居中的方法有哪些？



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