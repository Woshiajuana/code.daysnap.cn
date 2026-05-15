# 浏览器与 Web 基础面试题

对应大纲：[outline.md](./outline.md) 的 `3. 浏览器与 Web 基础`。

## 1. HTML 解析、CSSOM、Render Tree、Layout、Paint、Composite

### 1.1 浏览器从输入 URL 到页面展示经历了什么？

一个完整流程可以概括为：

- URL 解析。
- 查找缓存。
- DNS 解析。
- 建立 TCP 连接。
- HTTPS 场景下进行 TLS 握手。
- 发送 HTTP 请求。
- 服务端处理并返回响应。
- 浏览器解析 HTML。
- 加载并解析 CSS、JavaScript、图片等资源。
- 构建 DOM、CSSOM、Render Tree。
- 执行布局、绘制、合成。
- 页面展示，并继续处理交互、异步请求和资源加载。

面试中不需要每次都讲得特别细，重点是能把网络链路和浏览器渲染链路串起来。

### 1.2 HTML 是如何解析成 DOM 的？

浏览器拿到 HTML 后，会通过 HTML Parser 把字符串解析成 DOM Tree。

示例：

```html
<html>
  <body>
    <h1>Hello</h1>
  </body>
</html>
```

会形成类似结构：

```text
document
└── html
    └── body
        └── h1
            └── text
```

HTML 解析特点：

- HTML 解析是流式的，浏览器可以边下载边解析。
- 遇到外部 CSS，会继续解析 HTML，但 CSS 会阻塞后续渲染。
- 遇到普通外部 JS，通常会暂停 HTML 解析，下载并执行 JS 后再继续。
- 使用 `defer`、`async` 可以改变脚本阻塞行为。

### 1.3 CSSOM 是什么？

CSSOM 是浏览器把 CSS 解析后得到的样式规则树。

```css
body {
  margin: 0;
}

.title {
  color: red;
}
```

浏览器会解析选择器、层叠规则、继承规则、优先级，最终计算出每个元素应该应用哪些样式。

CSSOM 会阻塞渲染，因为浏览器需要知道元素样式才能正确绘制页面。

### 1.4 Render Tree 是什么？

Render Tree 是 DOM 和 CSSOM 结合后的渲染树。

它包含需要展示在页面上的节点以及这些节点的样式信息。

不会出现在 Render Tree 中的典型节点：

- `display: none` 的节点。
- `head`、`script`、`meta` 等不可见节点。

需要注意：

- `display: none` 不参与渲染树。
- `visibility: hidden` 仍然占据布局空间，会参与渲染树。
- `opacity: 0` 也会参与布局和合成，只是视觉透明。

### 1.5 Layout、Paint、Composite 分别是什么？

Layout，也叫布局或回流，负责计算元素的位置和尺寸。

例如：

- 元素宽高。
- 元素坐标。
- 文本换行。
- 盒模型尺寸。

Paint，也叫绘制，负责把元素的视觉内容绘制出来。

例如：

- 颜色。
- 文本。
- 边框。
- 阴影。
- 背景图。

Composite，也叫合成，负责把不同图层合成为最终页面。

例如：

- 合成多个层。
- 处理 transform。
- 处理 opacity。
- GPU 加速相关合成。

### 1.6 面试表达

可以这样回答：

```text
浏览器渲染大致分为解析 HTML 生成 DOM，解析 CSS 生成 CSSOM，二者结合生成 Render Tree，然后执行 Layout 计算几何信息，再 Paint 绘制像素，最后 Composite 合成图层。性能优化里经常要减少不必要的 Layout 和 Paint，把动画尽量放在 transform、opacity 这类更容易走合成的属性上。
```

## 2. 重排与重绘的触发条件和优化方式

### 2.1 什么是重排？

重排，也叫回流，指浏览器重新计算元素的几何信息，包括位置、尺寸、布局关系。

会触发重排的常见操作：

- 修改元素宽高、边距、边框、定位。
- 修改 `display`。
- 增删 DOM 节点。
- 修改文本内容导致尺寸变化。
- 改变窗口大小。
- 读取某些布局属性前，浏览器为了拿到最新值会强制同步布局。

常见会触发强制同步布局的属性：

```js
element.offsetWidth;
element.offsetHeight;
element.clientWidth;
element.clientHeight;
element.scrollTop;
element.getBoundingClientRect();
getComputedStyle(element);
```

### 2.2 什么是重绘？

重绘指元素的几何信息没有变化，但视觉样式变化，需要重新绘制。

会触发重绘的常见操作：

- 修改颜色。
- 修改背景。
- 修改阴影。
- 修改 `visibility`。
- 修改 `outline`。

重排通常会导致重绘，但重绘不一定导致重排。

### 2.3 如何优化重排和重绘？

减少读写交叉：

```js
// 不推荐：读写交叉，可能多次触发布局
for (const item of list) {
  item.style.width = `${item.offsetWidth + 10}px`;
}

// 更好：先读后写
const widths = list.map((item) => item.offsetWidth);

list.forEach((item, index) => {
  item.style.width = `${widths[index] + 10}px`;
});
```

批量修改 DOM：

```js
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i += 1) {
  const item = document.createElement('div');
  item.textContent = String(i);
  fragment.appendChild(item);
}

container.appendChild(fragment);
```

使用 class 批量改变样式：

```js
element.classList.add('active');
```

避免频繁操作影响布局的属性：

```css
/* 更容易触发重排 */
.box {
  left: 100px;
}

/* 更适合动画 */
.box {
  transform: translateX(100px);
}
```

长列表使用虚拟滚动，复杂计算放到 Web Worker，动画使用 `requestAnimationFrame`。

### 2.4 面试表达

可以这样回答：

```text
重排是重新计算布局，重绘是重新绘制视觉。重排成本通常更高，因为它会影响元素几何关系，甚至影响整棵渲染树。优化上我会减少 DOM 读写交叉、批量修改样式、用 transform 和 opacity 做动画、避免大面积布局变化，列表场景会考虑虚拟滚动。
```

## 3. 合成层、GPU 加速、transform 与 opacity 优化

### 3.1 什么是合成层？

浏览器在渲染页面时，可能会把页面拆成多个图层。每个图层单独绘制，最后由合成线程合成为最终页面。

某些元素可能被提升为独立合成层：

- 使用 `transform: translateZ(0)`。
- 使用 `will-change: transform`。
- 使用 3D transform。
- 视频、Canvas、WebGL。
- 固定定位元素在某些浏览器中可能独立成层。
- 动画中的 `transform`、`opacity`。

### 3.2 GPU 加速是什么？

GPU 加速通常指浏览器把部分图层合成工作交给 GPU 处理。对动画来说，如果只改变合成属性，就可以避免频繁 Layout 和 Paint。

适合动画的属性：

- `transform`。
- `opacity`。

不适合频繁动画的属性：

- `width`。
- `height`。
- `top`。
- `left`。
- `margin`。
- `padding`。

示例：

```css
.panel {
  transform: translateX(0);
  transition: transform 200ms;
}

.panel.is-open {
  transform: translateX(300px);
}
```

比下面这种更好：

```css
.panel {
  left: 0;
  transition: left 200ms;
}

.panel.is-open {
  left: 300px;
}
```

### 3.3 will-change 怎么用？

`will-change` 用来提前告诉浏览器某个属性即将变化，让浏览器提前做优化准备。

```css
.card {
  will-change: transform;
}
```

注意：

- 不要滥用。
- 不要给大量元素长期设置。
- 动画结束后可以移除。
- 过多合成层会增加内存占用，反而导致性能问题。

### 3.4 面试表达

可以这样回答：

```text
合成层优化的核心是把频繁变化的元素放到单独图层，让动画尽量只发生在合成阶段。transform 和 opacity 通常不会触发布局，很多情况下也可以避免重绘，所以适合做动画。但合成层不是越多越好，过多图层会占用内存，也会增加合成成本。
```

## 4. 浏览器一帧内的执行流程

### 4.1 一帧里发生了什么？

浏览器通常以 60 FPS 为目标时，一帧大约 16.7ms。一次页面更新可能包含：

- 执行 JavaScript。
- 处理微任务。
- 执行 `requestAnimationFrame` 回调。
- 样式计算。
- 布局。
- 绘制。
- 合成。
- 执行 `requestIdleCallback`，如果还有空闲时间。

不同浏览器实现细节会有差异，但面试中掌握整体顺序即可。

### 4.2 requestAnimationFrame 的作用

`requestAnimationFrame` 会在浏览器下一次重绘前执行，适合做动画更新。

```js
function animate() {
  element.style.transform = `translateX(${x}px)`;
  x += 1;

  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
```

相比 `setTimeout`，它的优势是：

- 和浏览器刷新节奏对齐。
- 页面隐藏时可能自动降频。
- 更适合动画。

### 4.3 requestIdleCallback 的作用

`requestIdleCallback` 会在浏览器空闲时执行，适合做低优先级任务。

```js
requestIdleCallback((deadline) => {
  while (deadline.timeRemaining() > 0 && tasks.length > 0) {
    runTask(tasks.shift());
  }
});
```

适合：

- 非关键日志上报。
- 预加载低优先级数据。
- 拆分不紧急的大任务。

注意：不是所有环境都稳定支持，需要降级方案。

### 4.4 长任务如何优化？

如果 JavaScript 长时间占用主线程，会阻塞输入响应和渲染。

优化方式：

- 拆分任务。
- 使用 `requestAnimationFrame` 分帧执行。
- 使用 `requestIdleCallback` 处理低优先级任务。
- 使用 Web Worker 处理计算密集任务。
- 减少同步阻塞操作。

示例：

```js
function runChunk(items, handler) {
  let index = 0;

  function next() {
    const start = performance.now();

    while (index < items.length && performance.now() - start < 8) {
      handler(items[index]);
      index += 1;
    }

    if (index < items.length) {
      requestAnimationFrame(next);
    }
  }

  next();
}
```

## 5. HTTP/1.1、HTTP/2、HTTP/3 的核心区别

### 5.1 HTTP/1.1

HTTP/1.1 的特点：

- 支持长连接。
- 支持管线化，但实践中使用较少。
- 一个 TCP 连接上请求响应基本还是按序处理。
- 容易出现队头阻塞。
- 浏览器通常会对同一域名建立多个连接。

常见优化：

- 域名分片。
- 资源合并。
- 雪碧图。
- 文件压缩。
- 缓存。

这些优化很多是为了解决连接数限制和请求开销。

### 5.2 HTTP/2

HTTP/2 的特点：

- 二进制分帧。
- 多路复用。
- 头部压缩。
- 流优先级。
- Server Push，现代实践中使用减少。

多路复用允许多个请求在一个 TCP 连接上并发传输，减少 HTTP/1.1 下多个连接的开销。

但 HTTP/2 仍然基于 TCP，如果 TCP 层丢包，仍然可能影响整个连接上的多个流。

### 5.3 HTTP/3

HTTP/3 基于 QUIC，底层使用 UDP。

特点：

- 减少连接建立延迟。
- 改善 TCP 层队头阻塞问题。
- 内置 TLS 1.3。
- 网络切换时连接迁移能力更好。

适合弱网、移动网络等场景。

### 5.4 面试表达

可以这样回答：

```text
HTTP/1.1 主要问题是连接和队头阻塞，所以过去会做资源合并、域名分片。HTTP/2 通过二进制分帧、多路复用、头部压缩提升传输效率，但仍然受 TCP 丢包影响。HTTP/3 基于 QUIC 和 UDP，进一步降低连接延迟，并改善传输层队头阻塞，在移动网络场景更有优势。
```

## 6. HTTPS 握手、TLS 基本流程、证书校验

### 6.1 HTTPS 解决什么问题？

HTTPS = HTTP + TLS。

它主要解决：

- 加密传输：避免明文被窃听。
- 身份认证：确认访问的是目标服务，而不是伪造站点。
- 完整性校验：防止数据被篡改。

### 6.2 TLS 握手大致流程

以常见 TLS 握手理解：

- 客户端发送 ClientHello，包含支持的 TLS 版本、加密套件、随机数等。
- 服务端返回 ServerHello，确定 TLS 版本、加密套件、随机数，并发送证书。
- 客户端校验证书是否合法。
- 双方通过密钥交换算法协商出会话密钥。
- 后续 HTTP 数据使用对称加密传输。

为什么不用非对称加密传输所有数据？

因为非对称加密开销大，HTTPS 通常使用非对称加密解决身份认证和密钥协商，用对称加密传输业务数据。

### 6.3 证书如何校验？

浏览器会校验：

- 证书是否过期。
- 域名是否匹配。
- 证书链是否可信。
- 证书是否被吊销。
- 签名是否有效。

证书链大致是：

```text
站点证书 -> 中间 CA -> 根 CA
```

根 CA 预置在操作系统或浏览器中。

### 6.4 面试表达

可以这样回答：

```text
HTTPS 通过 TLS 提供加密、认证和完整性保护。握手阶段客户端和服务端协商加密参数，服务端下发证书，客户端校验证书链和域名，然后双方协商会话密钥。真正传输业务数据时主要使用对称加密，因为性能更好。
```

## 7. 缓存机制：强缓存、协商缓存、Service Worker、CDN 缓存

### 7.1 浏览器缓存分几类？

常见缓存层级：

- Memory Cache：内存缓存，速度快，生命周期短。
- Disk Cache：磁盘缓存，容量较大，生命周期更长。
- HTTP Cache：由 HTTP 头控制。
- Service Worker Cache：由业务代码控制。
- CDN Cache：边缘节点缓存。

### 7.2 强缓存

强缓存命中时，浏览器不会向服务器发送请求。

常见响应头：

```http
Cache-Control: max-age=31536000
Expires: Wed, 21 Oct 2026 07:28:00 GMT
```

`Cache-Control` 优先级高于 `Expires`。

常见指令：

- `max-age`：缓存有效秒数。
- `no-cache`：使用前必须向服务器验证。
- `no-store`：不缓存。
- `private`：仅浏览器缓存。
- `public`：允许浏览器和中间缓存缓存。
- `immutable`：有效期内资源不会变化。

静态资源常见策略：

```http
Cache-Control: public, max-age=31536000, immutable
```

文件名带 hash：

```text
app.8f3a1c.js
style.3ac91e.css
```

### 7.3 协商缓存

强缓存失效后，浏览器向服务器验证资源是否变化。如果没变，服务器返回 `304 Not Modified`。

相关响应头和请求头：

```http
ETag: "abc123"
If-None-Match: "abc123"

Last-Modified: Wed, 21 Oct 2026 07:28:00 GMT
If-Modified-Since: Wed, 21 Oct 2026 07:28:00 GMT
```

`ETag` 通常优先级高于 `Last-Modified`。

`ETag` 更精确，可以基于内容 hash；`Last-Modified` 精度通常到秒，可能不够精确。

### 7.4 Service Worker 缓存

Service Worker 是运行在浏览器后台的脚本，可以拦截请求并控制缓存。

常见用途：

- 离线访问。
- PWA。
- 静态资源预缓存。
- 接口缓存。
- 弱网兜底。

简单示意：

```js
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request);
    }),
  );
});
```

注意：

- Service Worker 只在 HTTPS 或 localhost 下可用。
- 缓存更新策略要设计清楚。
- 容易出现老资源未更新问题。
- 需要版本管理和兜底清理。

### 7.5 CDN 缓存

CDN 会把资源缓存到离用户更近的边缘节点。

适合缓存：

- JS、CSS、图片、字体。
- 不频繁变化的静态资源。
- 可公开访问的文件。

CDN 缓存要关注：

- 缓存过期时间。
- 缓存刷新和预热。
- URL hash。
- 回源策略。
- 动态接口是否允许缓存。

### 7.6 缓存策略怎么设计？

常见实践：

- HTML：不走长期强缓存，使用协商缓存或短缓存。
- JS/CSS：文件名带 hash，使用长期强缓存。
- 图片字体：带 hash 的静态资源长期缓存。
- 接口：按业务设置 `no-store`、短缓存或协商缓存。
- CDN：静态资源长缓存，发布时通过 hash 变更 URL。

示例：

```http
# HTML
Cache-Control: no-cache

# 带 hash 的静态资源
Cache-Control: public, max-age=31536000, immutable
```

## 8. 跨域：同源策略、CORS、JSONP、代理、postMessage

### 8.1 什么是同源策略？

同源指协议、域名、端口都相同。

```text
https://example.com:443
```

下面这些都不同源：

```text
http://example.com
https://api.example.com
https://example.com:8443
```

同源策略限制不同源之间读取资源，主要是浏览器的安全机制。

### 8.2 CORS

CORS 是跨域资源共享，由服务器通过响应头声明允许哪些源访问。

简单请求可能只需要：

```http
Access-Control-Allow-Origin: https://example.com
```

带 Cookie 的跨域请求：

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Credentials: true
```

前端需要：

```js
fetch('https://api.example.com/user', {
  credentials: 'include',
});
```

注意：携带凭证时，`Access-Control-Allow-Origin` 不能是 `*`。

### 8.3 预检请求

复杂请求会先发送 OPTIONS 预检请求。

复杂请求常见条件：

- 使用 `PUT`、`DELETE` 等方法。
- 设置自定义请求头。
- `Content-Type` 不是简单类型。

预检响应示例：

```http
Access-Control-Allow-Origin: https://example.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Max-Age: 86400
```

### 8.4 JSONP

JSONP 利用 `script` 标签不受同源策略限制的特点。

```js
function handleUser(user) {
  console.log(user);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/user?callback=handleUser';
document.body.appendChild(script);
```

服务端返回：

```js
handleUser({ "name": "Alice" });
```

缺点：

- 只支持 GET。
- 安全性差。
- 错误处理弱。
- 现代项目中通常使用 CORS 替代。

### 8.5 代理

开发环境常用代理解决跨域：

```ts
// vite.config.ts
export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://api.example.com',
        changeOrigin: true,
      },
    },
  },
};
```

本质是浏览器请求同源开发服务器，再由开发服务器转发到目标接口。

生产环境也可以用 Nginx 或 BFF 做反向代理。

### 8.6 postMessage

`postMessage` 用于不同窗口、iframe、Worker 之间安全通信。

发送：

```js
iframe.contentWindow.postMessage(
  { type: 'LOGIN_SUCCESS', token: 'xxx' },
  'https://child.example.com',
);
```

接收：

```js
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://parent.example.com') {
    return;
  }

  console.log(event.data);
});
```

注意：

- 必须校验 `event.origin`。
- 不要把敏感信息发送给 `*`。
- 对 `event.data` 做格式校验。

## 9. 常见安全问题：XSS、CSRF、点击劫持、开放重定向、依赖供应链风险

### 9.1 XSS

XSS 是跨站脚本攻击，攻击者把恶意脚本注入页面并执行。

常见类型：

- 存储型 XSS：恶意内容存入数据库，其他用户访问时触发。
- 反射型 XSS：恶意内容来自 URL 或请求参数。
- DOM 型 XSS：前端直接把不可信内容插入 DOM。

危险写法：

```js
container.innerHTML = queryFromUrl;
```

防护方式：

- 对用户输入做校验。
- 输出时做转义。
- 避免直接使用 `innerHTML`。
- 富文本使用白名单过滤。
- 设置 CSP。
- Cookie 设置 `HttpOnly`，降低 token 被脚本读取的风险。

### 9.2 CSRF

CSRF 是跨站请求伪造。攻击者诱导用户在已登录状态下向目标站点发起请求。

防护方式：

- Cookie 设置 `SameSite`。
- 使用 CSRF Token。
- 校验 Origin 或 Referer。
- 关键操作增加二次确认。
- 不使用 GET 执行修改操作。

### 9.3 点击劫持

点击劫持是攻击者把目标页面放到透明 iframe 中，诱导用户点击。

防护响应头：

```http
X-Frame-Options: DENY
```

或使用 CSP：

```http
Content-Security-Policy: frame-ancestors 'none'
```

### 9.4 开放重定向

开放重定向是应用允许用户控制跳转地址，攻击者可构造可信域名下的恶意跳转链接。

危险示例：

```text
https://example.com/login?redirect=https://evil.com
```

防护方式：

- 只允许相对路径跳转。
- 对跳转域名做白名单。
- 跳转前二次确认。
- 不把用户可控 URL 直接传给 `location.href`。

### 9.5 依赖供应链风险

前端项目依赖多，供应链风险包括：

- 恶意 npm 包。
- 依赖劫持。
- typosquatting，包名拼写欺骗。
- postinstall 脚本执行恶意代码。
- 锁文件被篡改。

防护方式：

- 使用 lockfile。
- 开启依赖安全扫描。
- 谨慎引入小众包。
- 固定版本范围。
- CI 中执行审计。
- 对关键依赖做维护状态评估。
- 使用私有 npm 源或制品库。

## 10. Cookie、Session、Token、JWT、SameSite、HttpOnly、Secure

### 10.1 Cookie 是什么？

Cookie 是浏览器保存的小段数据，会在满足条件时自动随请求发送给服务端。

响应头设置：

```http
Set-Cookie: sid=abc123; Path=/; HttpOnly; Secure; SameSite=Lax
```

请求时浏览器自动带上：

```http
Cookie: sid=abc123
```

### 10.2 Session 是什么？

Session 通常是服务端保存的用户会话。浏览器只保存一个 session id，服务端根据 session id 查找用户状态。

特点：

- 状态保存在服务端。
- 服务端容易主动失效会话。
- 分布式系统中需要共享 Session，例如 Redis。
- 浏览器通常通过 Cookie 携带 session id。

### 10.3 Token 是什么？

Token 是访问令牌。登录后服务端签发 token，客户端后续请求携带 token。

常见携带方式：

```http
Authorization: Bearer <token>
```

特点：

- 可以用于前后端分离。
- 不一定依赖 Cookie。
- 需要考虑存储安全和过期刷新。

### 10.4 JWT 是什么？

JWT 是一种常见 token 格式，由三部分组成：

```text
Header.Payload.Signature
```

特点：

- Payload 可以携带用户信息和过期时间。
- 服务端可以通过签名验证是否被篡改。
- 默认只是编码，不是加密，不要放敏感信息。
- 一旦签发，在过期前不容易主动失效，除非引入黑名单或版本号机制。

### 10.5 SameSite

`SameSite` 用于控制 Cookie 是否在跨站请求中发送。

取值：

- `Strict`：严格同站才发送。
- `Lax`：部分顶级导航 GET 请求会发送，默认更安全。
- `None`：允许跨站发送，但必须配合 `Secure`。

示例：

```http
Set-Cookie: sid=abc; SameSite=Lax
```

防 CSRF 时，`SameSite` 是重要手段。

### 10.6 HttpOnly

`HttpOnly` 表示 Cookie 不能被 JavaScript 读取。

```http
Set-Cookie: sid=abc; HttpOnly
```

它不能阻止 XSS 发生，但可以降低 XSS 后 token 被直接窃取的风险。

### 10.7 Secure

`Secure` 表示 Cookie 只能通过 HTTPS 发送。

```http
Set-Cookie: sid=abc; Secure
```

生产环境中的登录态 Cookie 通常应该设置：

```http
Set-Cookie: sid=abc; HttpOnly; Secure; SameSite=Lax; Path=/
```

### 10.8 登录态方案如何选择？

常见方案：

- Cookie + Session：传统 Web 应用常见，服务端可控性强。
- Cookie + JWT：浏览器自动携带，但要处理 CSRF。
- Authorization Header + Token：前后端分离常见，但要关注 XSS 和存储安全。
- Access Token + Refresh Token：适合需要刷新登录态的系统。

实践建议：

- 高安全业务优先考虑 HttpOnly Cookie。
- Token 不要放敏感信息。
- 登录态要有过期、刷新、踢下线、失效机制。
- 前端本地存储 token 时要重点防 XSS。

## 11. 高频面试题

### 11.1 CSS 会阻塞 DOM 解析吗？

CSS 不会阻塞 DOM 解析，但会阻塞渲染。因为浏览器需要 CSSOM 才能计算元素样式。CSS 还可能间接阻塞 JS 执行，因为 JS 可能读取样式信息。

### 11.2 JS 为什么会阻塞 DOM 解析？

普通脚本可能调用 `document.write` 或操作当前 DOM，所以浏览器遇到普通 `script` 时会暂停 HTML 解析，等待脚本下载和执行完成。

可以使用：

```html
<script src="/app.js" defer></script>
<script src="/analytics.js" async></script>
```

`defer`：并行下载，等 DOM 解析完成后按顺序执行。

`async`：并行下载，下载完成后立即执行，执行顺序不保证。

### 11.3 localStorage、sessionStorage、Cookie 的区别？

Cookie：

- 容量小。
- 会随请求自动发送。
- 可设置过期时间和安全属性。
- 常用于登录态。

localStorage：

- 容量较大。
- 持久保存。
- 不自动随请求发送。
- 容易受到 XSS 影响。

sessionStorage：

- 生命周期为当前标签页会话。
- 不同标签页之间通常不共享。
- 适合临时状态。

### 11.4 OPTIONS 请求为什么出现？

OPTIONS 通常是 CORS 预检请求。浏览器在发送复杂跨域请求前，会先问服务器是否允许当前源、方法和请求头。服务器允许后，浏览器才发送真实请求。

### 11.5 为什么静态资源要加 hash？

加 hash 后，资源内容变化时 URL 会变化，可以配合长期强缓存。这样既能让用户长期缓存旧资源，又能在发布新版本时通过新 URL 获取新资源。

### 11.6 如何排查页面卡顿？

常见步骤：

- 用 Performance 面板录制。
- 查看是否有 Long Task。
- 分析 JS 执行、样式计算、布局、绘制耗时。
- 检查是否频繁触发重排。
- 检查大列表、大图片、大脚本。
- 看是否可以拆任务、虚拟滚动、懒加载或放到 Worker。

## 12. 面试表达建议

回答浏览器和 Web 基础题时，可以按这个结构：

- 先讲链路：从网络到渲染，或从请求到响应。
- 再讲机制：浏览器为什么这样做。
- 补充项目经验：性能优化、缓存策略、跨域处理、安全防护。
- 最后讲权衡：优化不是越多越好，要结合业务场景。

示例：

```text
缓存策略我一般会按资源类型区分。HTML 不做长期强缓存，避免入口文件更新不及时；带 hash 的 JS、CSS、图片可以设置长期强缓存和 immutable；接口缓存看业务一致性要求。这样既能减少重复下载，又能保证发布后用户能拿到最新入口。
```
