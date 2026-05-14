# 前端面试复习大纲

适用背景：十年前端开发经验，主要技术栈为 Vue、React，目标是中高级、资深前端、前端负责人或偏架构方向岗位。

## 1. 面试定位与准备策略

### 1.1 职级定位

- 明确目标岗位：高级前端、资深前端、前端架构师、前端负责人。
- 梳理核心竞争力：业务理解、复杂系统设计、工程化能力、性能优化、团队协作、技术决策。
- 准备一套 2 到 3 分钟的自我介绍：经历主线、核心项目、技术亮点、业务结果。
- 准备一套 5 到 8 分钟的代表项目深讲：背景、问题、方案、难点、收益、复盘。

### 1.2 简历与项目材料

- 简历中每个项目都要能讲清楚：业务目标、个人职责、技术方案、数据结果。
- 避免只写技术名词，要补充可量化收益：首屏耗时下降、包体积减少、构建速度提升、故障率下降、研发效率提升。
- 为每个项目准备追问答案：为什么这样设计、有什么替代方案、踩过什么坑、现在重做会怎么改。
- 准备技术影响力材料：组件库、脚手架、监控体系、规范建设、Code Review、团队培训、跨团队协作。

## 2. JavaScript 与 TypeScript 基础

### 2.1 JavaScript 核心

- 执行上下文、作用域链、闭包、变量提升、暂时性死区。
- 原型、原型链、继承方式、`class` 的本质。
- `this` 绑定规则：默认绑定、隐式绑定、显式绑定、`new` 绑定、箭头函数。
- 事件循环：宏任务、微任务、浏览器渲染时机、Node.js 事件循环差异。
- Promise 原理：状态流转、链式调用、错误穿透、`async/await`。
- 手写题：`call`、`apply`、`bind`、`new`、`Promise`、防抖、节流、深拷贝、发布订阅、LRU。
- 模块化：CommonJS、ESM、循环依赖、Tree Shaking。
- 内存管理：垃圾回收、内存泄漏场景、WeakMap、WeakSet。

### 2.2 TypeScript

- 基础类型、联合类型、交叉类型、字面量类型、类型收窄。
- interface 与 type 的区别和适用场景。
- 泛型：泛型函数、泛型组件、泛型约束、默认泛型。
- 工具类型：`Partial`、`Required`、`Pick`、`Omit`、`Record`、`ReturnType`、`Parameters`。
- 高级类型：条件类型、映射类型、模板字面量类型、`infer`。
- 类型设计能力：API 返回值建模、表单模型、权限模型、组件 Props 设计。
- 工程实践：`tsconfig`、类型声明文件、第三方库类型补充、渐进式迁移。

## 3. 浏览器与 Web 基础

### 3.1 浏览器渲染机制

- HTML 解析、CSSOM、Render Tree、Layout、Paint、Composite。
- 重排与重绘的触发条件和优化方式。
- 合成层、GPU 加速、`transform` 与 `opacity` 优化。
- 浏览器一帧内的执行流程：JS、样式计算、布局、绘制、合成。

### 3.2 网络与安全

- HTTP/1.1、HTTP/2、HTTP/3 的核心区别。
- HTTPS 握手、TLS 基本流程、证书校验。
- 缓存机制：强缓存、协商缓存、Service Worker、CDN 缓存。
- 跨域：同源策略、CORS、JSONP、代理、postMessage。
- 常见安全问题：XSS、CSRF、点击劫持、开放重定向、依赖供应链风险。
- Cookie、Session、Token、JWT、SameSite、HttpOnly、Secure。

## 4. Vue 复习重点

### 4.1 Vue 2 与 Vue 3 核心原理

- 响应式原理：`Object.defineProperty` 与 `Proxy` 的差异。
- 依赖收集与派发更新：Dep、Watcher、effect。
- 虚拟 DOM 与 Diff 算法：key 的作用、同层比较、最长递增子序列。
- 模板编译：template 到 render function 的大致过程。
- 异步更新队列：`nextTick` 原理与使用场景。
- 组件生命周期：Vue 2 与 Vue 3 生命周期映射。

### 4.2 Vue 3 实战

- Composition API：`setup`、`ref`、`reactive`、`computed`、`watch`、`watchEffect`。
- `ref` 与 `reactive` 的取舍，响应式丢失问题。
- 组件通信：props、emit、provide/inject、v-model、事件总线、状态管理。
- Pinia：store 设计、模块拆分、持久化、SSR 场景。
- Vue Router：动态路由、路由守卫、权限路由、懒加载。
- 组件封装：受控/非受控、插槽、作用域插槽、透传属性、暴露方法。
- 性能优化：`v-memo`、`defineAsyncComponent`、路由懒加载、长列表优化。

### 4.3 Vue 高频面试题

- Vue 2 数组和对象变更有哪些响应式限制？
- Vue 3 为什么使用 Proxy？有哪些边界？
- `computed` 和 `watch` 的区别是什么？
- `nextTick` 在什么场景下必须使用？
- Vue Diff 中 key 为什么不能使用 index？
- Vue 组件库如何设计 Form、Table、Dialog 等复杂组件？
- 如何从 Vue 2 迁移到 Vue 3？风险点有哪些？

## 5. React 复习重点

### 5.1 React 核心原理

- JSX 本质、React Element、Fiber 架构。
- React 渲染流程：render 阶段、commit 阶段。
- Diff 策略、key 的作用、组件更新判断。
- Hooks 原理：调用顺序、闭包问题、依赖数组。
- 状态更新机制：批处理、优先级、并发渲染。
- React 18：Concurrent Rendering、Automatic Batching、Transition、Suspense。

### 5.2 React 实战

- 常用 Hooks：`useState`、`useEffect`、`useMemo`、`useCallback`、`useRef`、`useReducer`、`useLayoutEffect`。
- 自定义 Hook 设计：请求、表单、权限、弹窗、订阅、埋点。
- 状态管理：Redux Toolkit、Zustand、MobX、React Query、SWR。
- 路由：React Router、权限路由、嵌套路由、懒加载。
- 表单：受控组件、非受控组件、校验、动态表单、性能优化。
- 组件设计：容器组件、展示组件、组合模式、Render Props、Compound Components。
- 性能优化：memo、useMemo、useCallback、虚拟列表、代码分割、避免无效渲染。

### 5.3 React 高频面试题

- 为什么 Hooks 不能写在条件语句中？
- `useEffect` 和 `useLayoutEffect` 有什么区别？
- 如何解决 Hooks 闭包陷阱？
- React 中 setState 是同步还是异步？
- React Fiber 解决了什么问题？
- React 18 并发特性对业务开发有什么影响？
- 如何设计一个高性能 React 表格或表单系统？

## 6. Vue 与 React 横向对比

- 响应式模型：Vue 的依赖追踪与 React 的状态驱动渲染。
- 模板与 JSX：表达能力、约束、工程可维护性。
- 组件通信方式对比。
- 状态管理方案对比：Pinia、Vuex、Redux Toolkit、Zustand、MobX。
- 性能优化思路对比：Vue 精准更新与 React 渲染控制。
- 大型项目组织方式对比。
- 如何向面试官表达自己同时具备 Vue 和 React 的迁移、选型、治理能力。

## 7. 前端工程化

### 7.1 构建工具

- Webpack：Loader、Plugin、构建流程、代码分割、缓存、Tree Shaking。
- Vite：原理、开发环境 ESM、生产构建 Rollup、预构建。
- Rollup：库打包、ESM/CJS/UMD 输出、external、sideEffects。
- Babel：编译流程、preset、plugin、polyfill。
- PostCSS、Sass、Less、CSS Modules、CSS-in-JS、原子化 CSS。

### 7.2 研发流程

- Monorepo：pnpm workspace、Turborepo、Nx、包边界治理。
- 代码规范：ESLint、Prettier、Stylelint、Commitlint。
- Git 工作流：分支策略、Code Review、变更风险控制。
- CI/CD：构建、测试、部署、回滚、灰度发布。
- 脚手架：项目模板、代码生成、规范内置、升级策略。
- 依赖治理：版本锁定、安全扫描、重复依赖、包体积分析。

### 7.3 测试体系

- 单元测试：Vitest、Jest。
- 组件测试：Vue Test Utils、React Testing Library。
- E2E 测试：Playwright、Cypress。
- 测试策略：核心逻辑优先、回归风险优先、快照测试边界。
- Mock 策略：接口 Mock、模块 Mock、时间 Mock、浏览器 API Mock。

## 8. 性能优化

### 8.1 性能指标

- Core Web Vitals：LCP、INP、CLS。
- 首屏时间、白屏时间、TTFB、FCP、TTI。
- 业务指标：页面转化率、接口耗时、错误率、资源加载失败率。

### 8.2 加载性能

- 资源压缩、代码分割、路由懒加载、预加载、预取。
- 图片优化：格式选择、响应式图片、懒加载、占位图。
- CDN、HTTP 缓存、Service Worker。
- 包体积分析：依赖拆分、按需引入、副作用标记。

### 8.3 运行时性能

- 长列表虚拟滚动。
- 大表单、大表格性能优化。
- 避免频繁重排重绘。
- Web Worker 处理重计算。
- Canvas、SVG、DOM 方案选型。
- 内存泄漏排查：Performance、Memory、Heap Snapshot。

## 9. 前端架构与系统设计

### 9.1 应用架构

- 大型 SPA 架构：目录分层、模块边界、路由设计、状态拆分。
- 微前端：qiankun、Module Federation、iframe、Web Components。
- BFF 与前端聚合层。
- SSR、SSG、ISR：Next.js、Nuxt、同构渲染。
- 多端复用：Web、H5、小程序、桌面端、移动端容器。

### 9.2 组件库与设计系统

- 组件库分层：基础组件、业务组件、区块、模板。
- 主题系统：Design Token、CSS 变量、暗色模式。
- 表单组件设计：校验、联动、动态渲染、异步数据。
- 表格组件设计：列配置、虚拟滚动、固定列、筛选、排序。
- 文档体系：Storybook、示例、变更日志、迁移指南。

### 9.3 稳定性与可观测性

- 前端错误监控：JS Error、Promise Error、资源错误、接口错误。
- 性能监控：采样、上报、聚合、告警。
- 埋点体系：曝光、点击、转化漏斗、无痕埋点。
- 日志关联：traceId、用户行为回放、接口链路。
- 降级方案：接口失败兜底、功能开关、灰度开关、离线缓存。

## 10. CSS 与可视化基础

### 10.1 CSS

- 盒模型、BFC、层叠上下文、定位、浮动、Flex、Grid。
- 响应式布局：媒体查询、容器查询、移动端适配。
- CSS 变量、主题切换、暗色模式。
- 动画：transition、animation、requestAnimationFrame。
- CSS 性能：选择器、合成层、动画属性选择。

### 10.2 可视化与图形

- Canvas、SVG、WebGL 的适用场景。
- 图表库：ECharts、AntV、D3 的选型。
- 大数据量图表优化：采样、分片渲染、离屏 Canvas。
- 交互设计：缩放、拖拽、框选、tooltip、联动。

## 11. 算法与编码题

### 11.1 高频算法

- 数组与字符串：双指针、滑动窗口、前缀和。
- 链表：反转链表、环形链表、合并链表。
- 栈与队列：有效括号、单调栈、最小栈。
- 树：遍历、层序遍历、最近公共祖先、路径和。
- 排序与搜索：快速排序、归并排序、二分查找。
- 动态规划：爬楼梯、最长递增子序列、最长公共子序列、背包基础。

### 11.2 前端特色编码题

- 实现 EventEmitter。
- 实现 Promise.all、Promise.race、并发控制器。
- 实现 debounce、throttle。
- 实现 deepClone，处理循环引用。
- 实现 flatten、compose、curry。
- 实现简易响应式系统。
- 实现虚拟列表核心逻辑。
- 实现请求重试、取消、超时、缓存。

## 12. 项目深挖准备

### 12.1 STAR 结构

- Situation：项目背景和业务问题。
- Task：你承担的职责和目标。
- Action：你做了什么技术决策和落地动作。
- Result：最终收益，用数据和事实表达。

### 12.2 必备项目案例

- 一个复杂业务项目：体现业务理解、模块拆分、长期维护。
- 一个性能优化项目：体现分析方法、指标对比、收益量化。
- 一个工程化项目：体现效率提升、规范建设、自动化能力。
- 一个组件库或平台项目：体现抽象能力、API 设计、团队协作。
- 一个线上故障案例：体现排查思路、止血能力、复盘机制。

### 12.3 高频追问

- 你在项目中最难的问题是什么？
- 这个方案为什么不是另一个方案？
- 项目规模变大后会遇到什么问题？
- 如何保证代码质量和交付质量？
- 如何推动团队接受你的技术方案？
- 如果现在重新设计，你会怎么做？

## 13. 管理、协作与软技能

- Code Review 标准：可读性、边界条件、性能、可测试性、安全性。
- 技术方案评审：背景、目标、方案对比、风险、里程碑。
- 跨团队协作：产品、设计、后端、测试、运维。
- 带人经验：任务拆分、成长反馈、知识分享。
- 技术债治理：识别、优先级、渐进式重构、收益表达。
- 冲突处理：需求变更、排期冲突、线上事故、方案分歧。

## 14. 面试模拟清单

### 14.1 一面：技术基础

- JavaScript、TypeScript、浏览器、网络、安全。
- Vue 或 React 框架原理。
- 手写题和基础算法。
- 项目中具体技术点追问。

### 14.2 二面：项目与架构

- 复杂项目深挖。
- 前端架构设计。
- 性能优化与稳定性。
- 工程化体系和团队实践。
- 技术选型与取舍。

### 14.3 三面：综合与匹配

- 职业规划。
- 团队协作方式。
- 业务理解能力。
- 技术影响力。
- 过往经历中的失败、复盘和成长。

## 15. 复习节奏建议

### 第 1 周：基础查漏

- JavaScript、TypeScript、浏览器、网络、安全。
- 每天 2 到 3 道手写题或算法题。
- 输出基础知识错题本。

### 第 2 周：框架强化

- Vue 原理、Vue 3 实战、React 原理、Hooks、React 18。
- 每天准备 3 到 5 个高频题的口述答案。
- 对比 Vue 和 React 的设计差异。

### 第 3 周：工程化与性能

- Webpack、Vite、Monorepo、CI/CD、测试。
- 性能指标、性能排查、性能优化案例。
- 准备 1 个完整的工程化项目案例。

### 第 4 周：项目与模拟面试

- 打磨自我介绍和代表项目。
- 用 STAR 结构重写项目表达。
- 每天模拟 1 轮面试，录音复盘表达问题。
- 整理常见追问和反问面试官的问题。

## 16. 反问面试官的问题

- 团队当前前端技术栈和工程化成熟度如何？
- 当前业务中最复杂的前端问题是什么？
- 团队如何做 Code Review、测试和发布？
- 入职后前三个月希望我解决什么问题？
- 这个岗位更看重业务交付、架构建设，还是团队协作？
- 团队对前端性能、稳定性、可观测性有哪些要求？

## 17. 重点复习优先级

高优先级：

- JavaScript、TypeScript、浏览器、网络、安全。
- Vue 3、React Hooks、React 18。
- 性能优化、工程化、项目深挖。
- 手写题、算法题、自我介绍。

中优先级：

- SSR、微前端、组件库、监控体系。
- Monorepo、CI/CD、测试体系。
- 可视化、跨端、多端适配。

低优先级：

- 冷门 API、过深源码细节、与目标岗位无关的小众技术。
- 没有项目支撑的概念堆砌。
