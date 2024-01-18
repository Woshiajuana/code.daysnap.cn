# 重绘、重排有什么区别？

## 概念

- 重绘(`repaint`)：当一个元素的外观发生改变，但没有改变布局，重新把元素外观绘制出来的过程，叫做重绘
- 重排(`reflow`)：也称作回流，当 `DOM` 的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。

## 浏览器解析渲染过程

1. 解析 `HTML` 生成，生成 `DOM` 树
2. 解析 `CSS` 生产 `CSSOM` 树
3. 将 `DOM` 树与 `CSSOM` 树结合，生成渲染树（`Render Tree`）
4. `Layout` (回流)：根据生成的渲染树，进行回流，得到节点的几何信息（位置，大小）
5. `Painting` (重绘)：根据渲染树以及回流得到的几何信息，得到节点的绝对像素
6. `Display`：将像素发送给 `GPU`，展示在页面上

**注意：** 重绘不一定导致重排，但重排一定会导致重绘。

## 常见的引起重绘的属性

- color
- border-style
- visibility
- background
- text-decoration
- background-image
- background-position
- background-repeat
- outline-color
- outline
- outline-style
- border-radius
- box-shadow
- background-size
- outline-width

## 常见引起重排属性和方法

- width
- height
- margin
- padding
- display
- border-width
- border
- position
- overflow
- font-size
- vertical-align
- min-height
- clientWidth
- clientHeight
- clientTop
- clientLeft
- scrollWidth
- scrollHeight
- scrollTop
- scrollLeft
- getComputedStyle()
- getBoundingClientRect()
- scrollIntoViewIfNeeded()
- 伪类：如：hover

## 重排优化方案有哪些？

浏览器优化机制：

- 由于每次重排都会造成额外的计算消耗，因此大多数浏览器都会通过队列化修改并批量执行来优化重排过程。浏览器会将修改操作放入到队列里，直到过了一段时间或者操作达到了一个阈值，才清空队列。
- 当你获取布局信息的操作的时候，会强制队列刷新，包括前面讲到的 `offsetTop` 等方法都会返回最新的数据。因此浏览器不得不清空队列，触发回流重绘来返回正确的值。

### 减少重排的范围

- 尽可能的在 DOM 树的最末端改变 class，重排是不可避免的，但是可以减少其影响，尽可能的在 DOM 树的最末端改变 class，可以限制重排的范围，尽可能少的影响其他节点。

### 减少重排的次数

- **样式集中改变**：不要频繁的操作样式，对于一个静态页面来说，明智且可维护的做法是更改类名，而不是修改样式。对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是统一在 cssText 变量中编辑。虽然现在大部分现代浏览器会有 flush 队列进行渲染队列优化，但是有些老版本的浏览器效率依然低下。

- **分离读写操作**：DOM 的多个读操作或者写操作，应该放在一起，不要两个读操作之间加入一个写操作。当我们修改了元素的集合属性，导致浏览器触发重排或重绘时，它会把该操作放进渲染队列，等到队列中操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

- **将 DOM 离线**：使用 `display:none`，一旦我们给元素设置 `display:none` 时（只有一次重排重绘），元素便不会再存在在渲染树中。

- **使用 absolute 或 fixed 脱离文档流**：使用绝对定会使的该元素单独成为渲染树中的 body 的一个子元素，重排开销比较小，不会对其它节点造成太多的影响，当你在这些节点上放置这个元素时，，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。

## 参考

[什么是重绘和重排](https://blog.csdn.net/qq_34402069/article/details/130562893)
