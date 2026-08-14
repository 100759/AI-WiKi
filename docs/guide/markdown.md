# Markdown 扩展

VitePress 提供了丰富的 Markdown 扩展功能。

## 代码块

支持语法高亮和行高亮：

```ts{2,4}
function add(a: number, b: number): number {
  // 高亮此行
  return a + b
  // 以及此行
}
```

## 自定义容器

::: info
这是一个信息容器
:::

::: tip
这是一个提示容器
:::

::: warning
这是一个警告容器
:::

::: danger
这是一个危险容器
:::

## 表格

| 功能 | 支持情况 |
|------|----------|
| 语法高亮 | ✅ |
| 数学公式 | ✅ |
| 图表 | ✅ |
| 流程图 | ✅ |

## 链接

[内部链接](/guide/getting-started) 会自动处理为 SPA 路由。

外部链接如 [VitePress 官网](https://vitepress.dev) 会正常打开。
