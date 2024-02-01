# 冒泡排序

比较相邻的两个元素,如果前一个比后一个大，则交换位置。

```js
function bubbleSort(arr) {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    // 每次比较的次数
    for (let j = 0; j < len - 1 - i; j++) {
      // 每次比较的元素
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
```

优化后的冒泡排序

```js
function bubbleSort(arr) {
  const len = arr.length;
  let flag = true;
  for (let i = 0; i < len - 1 && flag; i++) {
    // 每次比较的次数
    flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      // 每次比较的元素
      if (arr[j] > arr[j + 1]) {
        // 交换位置
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        flag = true;
      }
    }
  }
  return arr;
}
```

标记变量声明时状态为 `true`，进行循环后，标记变量初始化为 `false` 状态。当后边的项两两进行比较时，发生交换则将标记变量状态更正为 `true`，如果自始至终标记变量的状态都没有更正为 `true`，说明为有序，则在外层循环的终止判断语句中退出。
