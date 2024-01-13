# 如何解决 1px 问题？

先了解下像素的相关概念

|          概念          |           |                                                                                          描述                                                                                           |
| :--------------------: | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|          像素          |    px     |                                                                             是图像显示的基本单元，相对单位                                                                              |
|   设备像素(物理像素)   |    dp     |                        device pixels，显示屏就是由一个个物理像素点组成，屏幕从工厂出来那天起物理像素点就固定不变了。也就是我们经常看到的手机分辨率所描述的数字。                        |
| 设备独立像素(逻辑像素) |    dip    | device-independent pixels，就是我们手机的实际视口大小。是操作系统为了方便开发者而提供的一种抽象。程序与操作系统之间描述长度是以设备独立像素为单位。不随页面缩放、浏览器窗口大小而改变。 |
|        CSS 像素        |           |                                               在 CSS 中使用的 px 都是指 CSS 像素。不考虑缩放情况下，1 个 CSS 像素等于 1 个设备独立像素。                                                |
|       设备像素比       |    dpr    |                                                                   devicePixelRatio，是物理像素和设备独立像素的比值。                                                                    |
|        屏幕尺寸        |   inch    |                                                                                     屏幕对角线长度                                                                                      |
|       屏幕分辨率       | Resoution |         750\*1334，手机屏幕纵、横方向像素点数，单位是 px。常说的分辨率指的就是物理像素。相同大小的屏幕而言，屏幕分辨率越高显示的像素越多，单个像素尺寸较小，显示效果就越精细。          |
|        像素密度        |  dpi/ppi  |                                     750\*dot per inch(pixels per inch)，每英寸像素数，通过屏幕尺寸和分辨率来计算像素密度。也是屏幕出厂时就确定了。                                      |

前端主要关注

- 设备像素(物理像素)
- 设备独立像素(逻辑像素)
- CSS 像素
- 设备像素比

## 伪元素 + CSS3 缩放

```css
// 通过伪元素实现 0.5px border
.border::after {
  content: "";
  box-sizing: border-box; // 为了与原元素等大
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid gray;
  transform: scale(0.5);
  transform-origin: 0 0;
}

// 通过伪元素实现 0.5px 细线
.line::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #b3b4b8;
  transform: scaleY(0.5);
  transform-origin: 0 0;
}

// dpr适配可以这样写
@media (-webkit-min-device-pixel-ratio: 2) {
  .line::after {
    height: 1px;
    transform: scale(0.5);
    transform-origin: 0 0;
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .line::after {
    height: 1px;
    transform: scale(0.333);
    transform-origin: 0 0;
  }
}
```

## 动态 viewport + rem 布局

```html
<meta
  name="viewport"
  content="
    width=device-width,  // 设置viewport的宽等于屏幕宽
    initial-scale=1.0,  // 初始缩放为1
    maximum-scale=1.0, 
    user-scalable=no,  // 不允许用户手动缩放
    viewport-fit=cover // 缩放以填充满屏幕
  "
/>
```

`initial-scale` 缩放值越大，当前 `viewport` 的宽度就会越小。

```html
<head>
  <meta
    name="viewport"
    content="width=device-width,user-scalable=no,initial-scale=1,
                minimum-scale=1,maximum-scale=1,viewport-fit=cover"
  />
  <script type="text/javascript">
    // 动态设置 viewport 的 initial-scale
    var viewport = document.querySelector("meta[name=viewport]");
    var dpr = window.devicePixelRatio || 1;
    var scale = 1 / dpr;
    viewport.setAttribute(
      "content",
      "width=device-width," +
        "initial-scale=" +
        scale +
        ", maximum-scale=" +
        scale +
        ", minimum-scale=" +
        scale +
        ", user-scalable=no"
    );
    // 计算 rem font-size
    var clientWidth =
      document.documentElement.clientWidth || document.body.clientWidth;
    clientWidth > 750 && (clientWidth = 750);
    var ft = (clientWidth / 7.5).toFixed(2); // 以750设计稿为例
    document.documentElement.style.fontSize = ft + "px";
  </script>
</head>
```

```
CSS 像素个数 = 设备独立像素个数 / scale = （ 物理像素个数 / dpr ）/ scale
而
scale = 1 / dpr
// 所以
CSS 像素个数 = 物理像素个数
```

## border-image / 背景图 / 渐变 实现

```css
.border-bottom-1px {
  border-width: 0 0 1px 0;
  -webkit-border-image: url(linenew.png) 0 0 2 0 stretch;
  border-image: url(linenew.png) 0 0 2 0 stretch;
}
```

上文是把 border 设置在边框的底部，所以使用的图片是 2px 高，上部的 1px 颜色为透明，下部的 1px 使用视觉规定的 border 的颜色。

## 使用 box-shadow 模拟边框

```css
.box-shadow-1px {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

优点：代码少，兼容性好。缺点：边框有阴影，颜色变浅。

## 参考

- [为什么会存在 1px 问题？怎么解决？](https://mp.weixin.qq.com/s?__biz=MzUyMDk4OTU5OA==&mid=2247528392&idx=7&sn=d025e40c3dafa46108118f351ed1758f&chksm=f9e3d139ce94582fa75c29d871a2b2adde65ea2e68c682ff7b1f218417321e783243c7925f5b&scene=27)
- [6 种解决移动端 1px 的方案](https://zhuanlan.zhihu.com/p/661899328)
