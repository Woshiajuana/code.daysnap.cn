# link 标签中的 ref 值

> 用于定义文档与外部资源的关系‌。

## 常见rel属性值

- `stylesheet`：引入CSS样式表

```html
<link rel="stylesheet" href="style.css"> ‌‌
```

- `icon`：定义网站图标（Favicon）

```html
<link rel="icon" href="/favicon.ico" type="image/x-icon"> ‌‌
```

- `preload`：预加载关键资源（如字体、图片）

```html
<link rel="preload" href="font.woff" as="font" type="font/woff"> ‌‌
```

- `prefetch`：预加载未来可能访问的资源

```html
<link rel="prefetch" href="next-page.html"> ‌‌
```

- `alternate`：提供替代内容（如RSS源）

- `next/prev`：定义页面导航顺序

- `canonical`：指定页面首选版本 ‌‌