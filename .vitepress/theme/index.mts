import { type EnhanceAppContext } from "vitepress/dist/client";
import DefaultTheme from "vitepress/theme";
import { Sandbox } from "vitepress-plugin-sandpack";
import "vitepress-plugin-sandpack/dist/style.css";
import "./overwrite.scss";

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);

    // 公共组件
    ctx.app.component("Sandbox", Sandbox);

    // 路由钩子函数
    ctx.router.onAfterRouteChanged = (to) => {
      if (typeof window !== 'undefined') {
        const _hmt = (window as any)._hmt;
        if (typeof _hmt !== "undefined") {
          _hmt.push(["_trackPageview", to]);
        }
      }
    };
  },
};
