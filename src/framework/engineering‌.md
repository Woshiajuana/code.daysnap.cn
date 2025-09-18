# 前端项目工程化、规范化是为了解决什么问题？

## 什么是规范化

- 代码风格
  - 变量命名、函数风格统一
  - eslint9 + prettier + stylelint
- 文件命名
- 目录结构
- 提交规范

等，保证上述几点统一，为了保证项目的可维护性、一致性。

## eslint 规范约定

- 规范等级
  - off
  - warn
  - error
- 核心规则
  - 语法检查
    - 变量没有使用
    - console.log
  - 风格一致性
    - 分号、空格、缩进、换行等
  - 最佳实践

## eslint 架构

- eslint 核心引擎
  - eslint 初始化
  - 配置加载
  - 文件解析 
  - 规则的处理
- parser 解析器，解析成抽象语法树 ast
  - espree
  - @typescript-eslint/parser
- plugins 插件
  - 规则集
- 配置成

### 实验

- eslint + prettier 集成
- CI/CD 通过调用脚本，来实现校验触发 `npm lint`