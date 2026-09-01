# AGENTS.md

## Deno 官方参考（需要时抓取最新，勿复制进仓库）

- 入口: https://deno.com/agents.md
- 用法快速参考: https://docs.deno.com/llms-full-guide.txt
- 文档索引: https://docs.deno.com/llms.txt

## 全局约定（Noah）

- 运行时统一 Deno；**不用 npm / node_modules**；依赖走 JSR / Deno 内置；npm: 仅在明确批准时
- 内容站用 Lume；应用用 Fresh（Preact）；纯接口用 Deno.serve（+Hono）
- 命令走 deno task；提交前 deno fmt / deno lint / deno check 必须通过
- 迁移时保持内容、页面 URL、视觉设计不变；一次一个项目；有疑问先问，别猜着改
- CSP 用静态方式，避免 'unsafe-inline'（内联脚本移外部、用 script-src 'self'；少量必须内联的手动固定 sha256）；不写多余的自定义插件

## 本项目：personal-blog（noahqin.dev）

- 已完成 Astro → Lume 重写（纯 Deno，不用 npm）
- 保留所有文章、about/timeline 页与现有 URL
- 交互岛：主题切换→原生 JS；命令菜单→原生 JS/Lume 组件；评论→先查清方案（优先第三方嵌入脚本），动手前问我
- CSP：选静态 CSP 头，避免 unsafe-inline（内联脚本移外部用 script-src 'self'；少量必须内联的手动固定 sha256）
