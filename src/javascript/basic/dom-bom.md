# DOM 和 BOM

## DOM

文档对象模型，全称 `Document Object Model`，是 `W3C` 定义的一套用于处理 `HTML` 和 `XML` 文档内容的标准编程接口 `API`。

`javascript` 实现 `DOM` 接口的对象对应的是 `document` 对象，`JS` 通过该对象来对 `HTML/XML` 文档进行增删改查。

```js
// 创建
const ele1 = document.createElement("div");

// 查询
const ele2 = document.getElementById("name");
```

## BOM

浏览器对象模型，全称 `Browser Object Model`，用于操作浏览器而出现的 `API`。

`BOM` 对象由多个对象构成，其中代表浏览器窗口的 `window` 对象是 `Javascript` 顶层对象，其他 `BOM` 对象均为 `window` 对象的子对象。被作为 `window` 对象的属性来引用。

分为以下几类：

- document
- event
- history
- location
- screen
- navigator

**注意** 在 `BOM` 和 `DOM` 结构层次图中，`document` 对象属于 `window` 对象，所以 `DOM` 也可以看作是 `BOM` 的一部分。

## 参考

- [BOM 与 DOM](https://blog.csdn.net/weixin_47432345/article/details/126211808)
