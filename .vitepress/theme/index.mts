import DefaultTheme from "vitepress/theme";
import { Sandbox } from "vitepress-plugin-sandpack";
import "vitepress-plugin-sandpack/dist/style.css";
import { EnhanceAppContext } from "vitepress";
import "./overwrite.css";

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);

    // 公共组件
    ctx.app.component("Sandbox", Sandbox);
  },
};
