# var、let、const 区别【待完善】

- `var` 存在变量提升，`let` 和 `const` 不存在变量提升。

- `var` 定义的变量可以声明很多次，而 `let`、`const` 定义的变量只能声明一次

- `var` 声明的变量没有自身的作用域，而 `let`、`const` 声明的变量有块级作用域

- `var` 定义的变量，会自动挂载到 `window`，而 `let`、`const` 不会

- `var`、`let` 声明的变量可以重新赋值，而 `const` 声明的变量不能再次赋值

- `var` 、`let` 可以只声明，`const` 必须提供初始值
