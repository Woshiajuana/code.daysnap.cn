# 常用的 META 标签

> meta 是由 name 和 content 属性定义的，用来描述网页文档的属性

- 设置 HTML 页面编码类型

  ```html
  <meta charset="UTF-8" />
  ```

- 设置 HTML 页面的关键词

  ```html
  <meta name="keywords" content="关键词" />
  ```

- 设置当前 HTML 页面标签描述信息

  ```html
  <meta name="description" content="描述内容" />
  ```

- 设置作者信息

  ```html
  <meta name="author" content="张三" />
  ```

- 页面重定向和刷新

  ```html
  <meta http-equiv="refresh" content="0;url=https://www.baidu.com" />
  ```

- 禁止读取本地缓存

  ```html
  <meta http-equiv="Pragma" content="no-cache" />
  ```

- viewport 视窗

  ```html
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"
  />
  ```

  |     属性      |                                 描述                                 |
  | :-----------: | :------------------------------------------------------------------: |
  |    weight     | 宽度（数值 / device-width）（范围从 200 到 10,000，默认为 980 像素） |
  |    height     |         高度（数值 / device-height）（范围从 223 到 10,000）         |
  | initial-scale |                  初始的缩放比例 （范围从>0 到 10）                   |
  | minimum-scale |                       允许用户缩放到的最小比例                       |
  | maximum-scale |                       允许用户缩放到的最大比例                       |
  | user-scalable |                     用户是否可以手动缩 (no/yes)                      |
  | viewport-fit  |                可视视窗的大小 (Auto / Contain/ Cover)                |
