import { type EnhanceAppContext } from 'vitepress/dist/client';
import DefaultTheme from 'vitepress/theme'
import { Sandbox } from 'vitepress-plugin-sandpack'
import 'vitepress-plugin-sandpack/dist/style.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx);
    ctx.app.component('Sandbox', Sandbox);
  },
}