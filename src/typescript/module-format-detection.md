# 说一说模块格式检测

- `.mts`、`.mjs`、`.d.mts` 文件始终是 `ES` 模块

- `.cts`、`.cjs`、`.d.cts` 文件始终是 `CommonJS` 模块

- `.ts`、`.tsx`、`.js`、`.jsx`、`.d.ts` 文件，如果最近的祖先 `package.json` 文件包含 `"type": "module"` 则是 `ES` 模块，否则为 `CommonJS` 模块
