# 好好睡觉 · Rested Well

> Sleep Better. Feel Better. Live Better.
>
> 睡得更好，精力更好，生活更好。

一个面向中文读者的**睡眠科学与精力管理知识平台**。网站不是普通的健康资讯博客，而是把「科学知识库 + 实操指南 + 经典书单 + 专业资源 + 交互工具」整合在一起的知识媒体产品。

核心理念：**睡眠不是浪费时间，而是为清醒的生活积蓄能量。**

---

## 一、技术栈

| 能力 | 选型 |
| --- | --- |
| 框架 | Next.js 15（App Router） |
| 语言 | TypeScript（strict） |
| 样式 | Tailwind CSS 3 + 自定义设计令牌 |
| 组件 | shadcn 风格自建基础组件 + Radix Dialog |
| 图标 | lucide-react |
| 图表 | Apache ECharts（按需注册、自动 resize） |
| 长文 | MDX（`next-mdx-remote/rsc` + `remark-gfm`） |
| 数据 | 结构化本地数据（TypeScript）+ MDX 文件 |
| 图片 | Next.js Image（Unsplash / Open Library 白名单） |

---

## 二、快速开始

环境要求：**Node.js ≥ 18.18**（推荐 20+）、npm 9+。

```bash
# 1. 安装依赖
npm install

# 2. 本地开发（默认 http://localhost:3000）
npm run dev

# 3. 生产构建
npm run build

# 4. 启动生产服务
npm run start
```

其他脚本：

```bash
npm run lint         # ESLint 检查
npx tsc --noEmit     # 类型检查
```

---

## 三、部署

### GitHub Pages（已集成）

仓库已内置 GitHub Actions 工作流 `.github/workflows/deploy.yml`，推送到 `main` 后自动构建并部署：

1. 在仓库 **Settings → Pages → Build and deployment** 中，将 Source 设为 **GitHub Actions**。
2. 确认 Pages 的 custom domain 未占用；项目站点地址为 `https://yuxinrun.github.io/rested-well/`。
3. 推送到 `main`（或手动触发 workflow），等待构建完成即可。

部署相关约定：

- 工作流以 `GH_PAGES=1` 构建，启用 `output: 'export'` 静态导出，产物在 `out/`。
- 站点部署在 `/rested-well/` 子路径，已配置对应 `basePath`；本地开发与 Vercel 不受影响。
- `NEXT_PUBLIC_SITE_URL` 注入线上地址，供 Sitemap、Open Graph 与结构化数据使用。
- `out/.nojekyll` 避免 GitHub Pages 忽略 `_next` 目录。
- 静态站点无图片优化服务，构建时启用 `images.unoptimized`。

### Vercel（推荐）

1. 将仓库推送到 GitHub / GitLab。
2. 在 Vercel 导入项目，框架会自动识别为 Next.js。
3. 无需额外环境变量，直接 Deploy。
4. 绑定自有域名后，把 `src/data/site.ts` 中的 `siteConfig.url` 改成正式域名，Sitemap、Open Graph 与结构化数据会自动使用该地址。

### 自建服务器（Node）

```bash
npm ci
npm run build
npm run start -- -p 3000
```

建议用 Nginx / Caddy 反向代理并开启 HTTP/2、Brotli 压缩与静态资源长缓存。

> 项目几乎全部页面为静态预渲染（SSG / Static），只有 `/opengraph-image` 使用 Edge Runtime 动态生成社交分享图。

---

## 四、页面路由

| 路由 | 说明 |
| --- | --- |
| `/` | 独立首页（Hero、睡眠科学、精力曲线、实用指南、文章、书单、资源、实验室、今日行动） |
| `/sleep` | 睡眠科学总览 |
| `/sleep/basics` | 睡眠基础 |
| `/sleep/improvement` | 睡眠改善 |
| `/sleep/circadian` | 昼夜节律与生物钟 |
| `/sleep/problems` | 睡眠问题与专业求助（谨慎、非诊断式表达） |
| `/energy` | 精力管理 |
| `/energy/fatigue` | 疲劳管理 |
| `/energy/focus` | 注意力与专注 |
| `/energy/recovery` | 恢复方法 |
| `/lifestyle` | 生活方式与恢复 |
| `/lifestyle/exercise` | 运动与睡眠 |
| `/lifestyle/nutrition` | 饮食与睡眠 |
| `/books` · `/books/[slug]` | 书单与书籍详情 |
| `/websites` · `/websites/[slug]` | 专业网站资源与详情 |
| `/research` | 研究与科学 |
| `/research/topics` · `/research/topics/[slug]` | 睡眠科学研究专题（含证据等级与争议） |
| `/research/infographics` | 睡眠周期 / 昼夜节律 / 生物钟 / 睡眠压力图解 |
| `/guides` · `/guides/[slug]` | 真实生活场景睡眠改善指南 |
| `/learning-path` | 从睡眠基础到高级精力管理的六阶段学习路线 |
| `/articles` · `/articles/[slug]` | 文章中心与 MDX 长文 |
| `/lab` | 睡眠与精力实验室 |
| `/lab/sleep-diary` | 睡眠日记 |
| `/lab/energy-tracker` | 精力记录 |
| `/lab/sleep-review` | 睡眠规律分析 |
| `/lab/habits` | 睡前习惯追踪 |
| `/lab/weekly-review` | 每周恢复复盘 |
| `/lab/environment` | 睡眠环境检查 |
| `/lab/schedule` | 作息计划 |
| `/about` | 关于我们 |
| `/sitemap.xml` · `/robots.txt` | SEO 自动生成 |

---

## 五、目录结构

```
rested-well/
├─ content/
│  └─ articles/*.mdx              # 深度长文（frontmatter + 正文）
├─ public/                         # 静态资源
├─ src/
│  ├─ app/                         # App Router 页面
│  │  ├─ layout.tsx                # 全局布局、SEO metadata
│  │  ├─ page.tsx                  # 首页
│  │  ├─ sitemap.ts / robots.ts    # SEO
│  │  ├─ opengraph-image.tsx       # 动态社交分享图
│  │  └─ ...                       # 各栏目与实验室路由
│  ├─ components/
│  │  ├─ layout/                   # 导航、Footer、Logo
│  │  ├─ shared/                   # 页面模板、卡片、面包屑、图片、声明
│  │  ├─ home/                     # 首页各板块
│  │  ├─ charts/                   # ECharts 封装与图表组件
│  │  ├─ illustrations/            # 原创 SVG 科学示意图
│  │  ├─ lab/                      # 七款交互工具
│  │  ├─ books/ websites/ articles/# 数据库浏览器
│  │  └─ ui/                       # 基础 UI（Button 等）
│  ├─ data/
│  │  ├─ site.ts                   # 站点配置、导航、图片、今日行动
│  │  ├─ books.ts                  # 书籍数据库
│  │  ├─ websites.ts               # 专业网站数据库
│  │  ├─ lab.ts                    # 工具清单
│  │  └─ knowledge/                # 六大知识库内容
│  ├─ lib/                         # 文章解析、本地存储、工具函数
│  └─ types/                       # 全局类型
├─ tailwind.config.ts              # 设计令牌
└─ next.config.mjs                 # 图片域名白名单
```

---

## 六、内容维护

### 新增文章

在 `content/articles/` 下新建 `.mdx` 文件，frontmatter 字段：

```yaml
---
title: 文章标题
description: 用于卡片与 SEO 的一句话摘要
category: 睡眠科学          # 睡眠科学 / 睡眠改善 / 精力管理 / 生活方式 / 昼夜节律
level: 入门                 # 入门 / 进阶 / 深入
cover: https://images.unsplash.com/photo-xxxx
date: '2026-01-15'
updated: '2026-03-02'
author: 好好睡觉编辑部
reviewer: 资料整理者（可选）
readMinutes: 14
tags: [睡眠周期, 证据等级]
---
```

正文支持标准 Markdown 与 GFM 表格。文章页会自动生成阅读时长、上下篇、相关文章、`Article` 结构化数据与免责声明。

### 新增书籍 / 网站

编辑 `src/data/books.ts` 或 `src/data/websites.ts`，按既有类型补充字段即可。`/books/[slug]`、`/websites/[slug]` 与 Sitemap 会自动渲染新条目。

### 新增知识点

编辑 `src/data/knowledge/*.ts` 中的分组与主题。每个主题支持 `summary`、`takeaway`、`readMinutes`、`relatedArticle`。

---

## 七、设计系统

| 令牌 | 值 | 用途 |
| --- | --- | --- |
| `cream-50/100/200` | `#FDFBF6` / `#F8F4EA` / `#F1EADB` | 暖白、奶油白背景 |
| `sage-400–700` | 鼠尾草绿 | 品牌主色、按钮、图表主色 |
| `mist-*` | 雾蓝 | 辅助色、资源类信息 |
| `lavender-*` | 浅薰衣草紫 | 辅助色、实验室工具 |
| `apricot-*` | 柔和暖橙 | 强调色、提示与今日行动 |
| `ink` / `ink-soft` / `ink-muted` | 深灰三阶 | 正文与层级文字 |

字体：标题使用优雅衬线（Noto Serif SC 等系统衬线回退），正文使用清晰中文无衬线（Noto Sans SC / 苹方 / 微软雅黑）。

统一组件类：`.container-content`、`.section-pad`、`.card-base`、`.card-lift`、`.eyebrow`、`.prose-rw`、`.note-box`、`.skeleton-shimmer`。已适配 `prefers-reduced-motion`。

---

## 八、交互工具与数据

实验室七款工具全部使用浏览器 `localStorage`：

- 不上传、不需要账号；
- 支持一键导出 JSON 备份；
- 支持清除全部本地记录；
- 主观评分（睡眠质量、精力、疲劳）均明确标注为**主观自评**，不作为客观医学指标。

时间计算统一使用跨午夜逻辑（如 23:00 → 07:00 记为 8 小时），入睡时间波动采用圆周平均与标准差。

---

## 九、健康与内容责任

本站为**健康教育与生活方式信息平台**，不能替代医生诊断和治疗。内容遵循以下规则：

1. 不诊断用户是否患有失眠或其他疾病；
2. 不承诺任何方法可以「治愈」睡眠障碍；
3. 不推荐自行使用处方药或调整药物剂量；
4. 对褪黑素、补充剂与助眠产品保持谨慎表述；
5. 不把单一睡眠时长标准当作所有人的统一要求；
6. 不夸大睡眠追踪设备的准确性；
7. 区分医学证据、观察性研究、作者观点与编辑建议；
8. 睡眠时长、光照、咖啡因、运动与酒精的影响均说明存在个体差异；
9. 对持续失眠、严重打鼾、疑似睡眠呼吸暂停、异常日间嗜睡提示专业评估；
10. 文章标注作者与更新时间，确有审核时标注审核者。

---

## 十、SEO 与性能

- 每页独立 `title` / `description`，模板化 title 后缀；
- Open Graph 与 Twitter Card，动态品牌分享图（`/opengraph-image`）；
- `sitemap.xml` 覆盖静态页与书籍 / 网站 / 文章动态页；
- `robots.txt` 指向 sitemap；
- 语义化 HTML、面包屑、`Book` / `Article` 结构化数据；
- 图片使用 `next/image`，Unsplash 自动追加尺寸与压缩参数，加载失败显示品牌占位；
- ECharts 在路由级代码分割中按需加载，图表按需注册 + `ResizeObserver` 自适应；
- 全站 `lang="zh-CN"`、跳转到主内容链接与可见焦点样式。

---

## 十一、实用脚本

```bash
# 把 public/images 下的 PNG 批量压缩为 WebP（质量 80，最长边 1600）
node scripts/optimize-images.mjs

# 规范化文章正文中的引号（直角引号 → 中文引号）
node scripts/fix-cjk-quotes.mjs
```

站点使用本地 WebP 摄影图（`public/images`），不依赖第三方图床；`next/image` 会自动按需生成尺寸并输出现代格式。

---

## 十二、许可与素材

- 代码：可自由用于学习与二次开发。
- 摄影图片：项目内 `public/images` 为原创生成素材，已裁除工具水印并压缩为 WebP。
- 书籍封面：Open Library Covers API；缺失时显示自研设计款占位封面。
- SVG 示意图：本项目原创绘制。
