# Hai-Alighieri 的博客

极简报纸式 Jekyll 博客，托管在 GitHub Pages，只为易读。

## 访问

- 站点：https://hai-alighieri.github.io
- 仓库：https://github.com/Hai-Alighieri/Hai-Alighieri.github.io

## 写文章

在 `_posts/` 里新建文件，文件名必须是 `年-月-日-标题.md`，例如 `2026-01-01-你好世界.md`。

顶部 front matter：

```markdown
---
layout: post
title: "文章标题"
subtitle: "副标题（可选）"
date: 2026-01-01
author: Hai-Alighieri
tags:
  - 生活
  - 记录
---

正文写在这里，支持 Markdown。
```

保存提交后，首页、归档、标签页会自动更新。

## 评论

使用 [giscus](https://giscus.app)（基于 GitHub Discussions）。配置方法：

1. 仓库 Settings → 勾选 Discussions；
2. 安装 giscus app：https://github.com/apps/giscus；
3. 打开 giscus.app 填好仓库，把生成的 `data-repo-id`、`data-category-id` 填进 `_config.yml`。

## 目录结构

```
├── _config.yml        # 站点配置
├── _layouts/          # 布局（default/page/post）
├── _includes/         # head/nav/footer/comments
├── _posts/            # 文章（Markdown）
├── assets/css/        # 报纸式样式
├── img/               # 图片
├── index.html         # 首页
├── archive.html       # 归档
├── tags.html          # 标签
├── about.html         # 关于
└── feed.xml           # RSS
```
