# isNaN 和 Number.isNaN 的区别？

- `isNaN`：通过 `Number()` 方法尝试将这参数转换成 `Number` 类型，如果成功返回 `false` ，如果失败返回 `true` 。`isNaN` 只是判断传入的参数是否能转换成数字，并不是严格的判断是否等于 `NaN` 。

- `Number.isNaN`：判断传入的参数是否严格的等于 `NaN`。

**区别**：`Number.isNaN`不存在类型转换的行为。

```js
isNaN("张三"); // true

Number.isNaN("张三"); // false
```

## 关于 NaN

NaN 是一个警戒值，代表在进行数字类型中运算失败时返回的结果，**它也不等于自身**

```
NaN === NaN // false
NaN !== NaN // true
```
