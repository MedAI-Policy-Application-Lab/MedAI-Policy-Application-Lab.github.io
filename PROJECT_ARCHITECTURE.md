# MAIPAL Project Architecture

## 1. 项目定位

这个项目是 `MAIPAL` 的官网前端，技术上是一个基于 `React + Vite + Tailwind CSS` 的静态站点。

它现在的核心目标不是做复杂的前端应用，而是：

- 保持你当前已经确认好的页面视觉和内容
- 让每个页面都能生成真实 HTML，便于搜索引擎抓取
- 保留 React 组件化开发体验，方便后续继续维护
- 部署到 GitHub Pages 这类静态托管平台时依然简单

换句话说，这个项目现在已经不是传统的“客户端单页应用路由优先”结构，而是一个：

- 开发阶段仍然用 React 组件开发
- 生产阶段自动预渲染成多页面静态 HTML
- 同时保留前端 hydration 能力的 SEO-first 架构

---

## 2. 当前技术栈

- `react`
- `react-dom`
- `vite`
- `tailwindcss`
- `postcss`
- `autoprefixer`

### 架构关键词

- `Static prerendering`
- `Pathname-based page rendering`
- `SEO metadata per page`
- `Sitemap / robots.txt generation`
- `GitHub Pages friendly output`

---

## 3. 目录总览

```text
index.html
package.json
vite.config.js
postcss.config.js
tailwind.config.js

public/
  CNAME
  .nojekyll

scripts/
  prerender.mjs

src/
  App.jsx
  main.jsx
  entry-server.jsx
  pageRegistry.jsx
  index.css
  data/
    siteData.js
  lib/
    pathname.js
  components/
    Layout.jsx
    SiteHeader.jsx
    SiteFooter.jsx
    SiteLink.jsx
  pages/
    HomePage.jsx
    ProjectPage.jsx
    PeoplePage.jsx
    BlogPage.jsx
    TutorialPage.jsx
    ResourcePage.jsx
```

---

## 4. 架构核心思路

### 4.1 开发时

开发环境下，Vite 会加载 `src/main.jsx`，根据当前浏览器地址栏里的 `pathname` 选择对应页面组件渲染。

也就是说，现在不是 `react-router-dom` 控制页面切换，而是：

1. 浏览器当前地址是 `/people/`、`/project/` 这类真实路径
2. `src/main.jsx` 读取 `window.location.pathname`
3. `src/App.jsx` 根据这个路径找到正确页面组件
4. 对应页面组件渲染出来

这样做的好处是：

- 页面 URL 更干净
- 不需要 `/#/blog` 这种哈希路由
- 更适合后续做预渲染和 SEO

### 4.2 生产构建时

生产构建时会执行三步：

1. `vite build`
2. `vite build --ssr src/entry-server.jsx --outDir dist-ssr`
3. `node scripts/prerender.mjs`

这三步分别负责：

- 生成客户端 JS/CSS 资源
- 生成服务端渲染入口
- 把每个页面都渲染成实体 HTML 文件

最终 `dist/` 里会变成真正的多页面静态站点，例如：

```text
dist/
  index.html
  project/index.html
  people/index.html
  blog/index.html
  tutorial/index.html
  resource/index.html
  sitemap.xml
  robots.txt
  404.html
```

这就是目前最重要的 SEO 提升点之一，因为搜索引擎拿到的不是空壳 HTML，而是带完整正文内容的页面源码。

---

## 5. 路由系统现在怎么工作

### 5.1 `src/pageRegistry.jsx`

这是整个站点的页面注册中心。

它负责定义：

- 页面路径
- 页面标题
- 页面描述
- 是否允许被索引
- 是否进入 sitemap
- 页面 schema 类型
- 页面组件本身

每新增一个页面，通常都需要先改这里。

当前每个页面大概有这些配置字段：

- `path`
- `title`
- `description`
- `robots`
- `includeInSitemap`
- `schemaType`
- `component`

### 5.2 `src/App.jsx`

`App.jsx` 的职责已经从“前端路由容器”变成了“页面选择器”。

它会：

- 接收当前路径
- 在 `pageRegistry` 里找到对应页面
- 渲染正确的页面组件
- 如果没找到，渲染 `NotFoundPage`

### 5.3 `src/lib/pathname.js`

这个文件负责处理路径标准化，例如：

- `/people`
- `/people/`

统一成同一种格式，避免 canonical 和页面匹配出现重复。

这个文件还负责拼接 canonical URL。

---

## 6. 页面渲染入口

### 6.1 `src/main.jsx`

浏览器端入口。

它负责：

- 读取当前路径
- 加载全局样式
- 如果页面已经有服务器渲染 HTML，则执行 `hydrateRoot`
- 如果没有，则执行普通 `createRoot`

这保证了：

- 开发环境照常运行
- 生产环境静态 HTML 可以继续被 React 接管
- `People` 页那种折叠交互仍然正常可用

### 6.2 `src/entry-server.jsx`

这个文件是静态预渲染专用入口。

它负责：

- 根据路径拿到对应页面 SEO 数据
- 把页面组件渲染成 HTML 字符串
- 生成页面结构化数据 JSON-LD
- 输出给 `scripts/prerender.mjs`

这个文件本质上是“构建阶段专用的渲染器”。

---

## 7. 预渲染脚本

### `scripts/prerender.mjs`

这个脚本是整个 SEO 架构的关键。

它的职责包括：

1. 读取客户端构建产物清单
2. 加载 SSR 入口
3. 遍历所有静态路径
4. 为每个页面生成完整 HTML 文件
5. 注入 SEO 标签
6. 生成 `sitemap.xml`
7. 生成 `robots.txt`
8. 生成 `404.html`

### 它注入的 SEO 内容

- `<title>`
- `meta description`
- `meta robots`
- `canonical`
- Open Graph 标签
- Twitter Card 标签
- JSON-LD 结构化数据
- 主题色

### 它生成的 SEO 文件

- `dist/sitemap.xml`
- `dist/robots.txt`
- `dist/404.html`

---

## 8. 页面索引策略

为了“更强 SEO”，不只是让页面能被抓取，还要避免薄内容页面影响整体站点质量。

当前策略是：

- `Home`、`Project`、`People`：允许索引
- `Blog`、`Tutorial`、`Resource`：`noindex,follow`

原因很简单：

- 后三者目前只有 `More to Come, Stay Tuned`
- 这种薄内容页被大量收录，通常不利于整体 SEO 质量
- 但它们仍然保留 `follow`，不会阻断站内链接关系

控制位置在：

- [src/pageRegistry.jsx](./src/pageRegistry.jsx)

如果未来这些页面填充了实质内容，只要把对应页面的：

- `robots`
- `includeInSitemap`

改回来即可。

---

## 9. 共享站点配置

### `src/data/siteData.js`

这个文件负责全站级配置。

当前包含：

- 品牌名
- 品牌长名称
- 站点 URL
- locale
- 默认社交分享图
- 主题色
- 外部品牌链接
- 顶部导航
- 底部导航

这是一个非常重要的集中配置文件。

以后如果要改这些内容，优先改这里：

- 品牌名
- 域名
- GitHub 链接
- Header 导航
- Footer 链接

---

## 10. 共享组件

### 10.1 `src/components/Layout.jsx`

所有页面最外层布局。

负责：

- 页面整体容器
- Header
- Footer
- 主体内容区的宽度和间距

### 10.2 `src/components/SiteHeader.jsx`

顶部导航。

负责：

- 品牌入口
- 导航列表
- 当前页面高亮
- 移动端菜单折叠

现在它不依赖前端路由库，而是依赖传入的 `currentPath` 判断当前高亮项。

### 10.3 `src/components/SiteFooter.jsx`

底部页脚。

负责：

- 品牌信息
- 版权信息
- Footer 链接

### 10.4 `src/components/SiteLink.jsx`

统一的链接组件。

它的意义是把内部链接和外部链接处理方式统一起来：

- 站内链接渲染成普通 `<a href="/people/">`
- 外链自动补上安全属性

这个组件对 SEO 也有帮助，因为站内链接现在都是真实 URL，不再依赖 JS 路由跳转。

---

## 11. 页面目录

### `src/pages/HomePage.jsx`

首页。

负责：

- 品牌首屏展示
- 主介绍文案
- 四个核心研究与开发支柱卡片

### `src/pages/ProjectPage.jsx`

项目页。

当前是：

- 保留页面头部说明
- 其余是占位内容

### `src/pages/PeoplePage.jsx`

团队页。

当前是最有交互性的页面之一。

包含：

- 团队成员卡片
- 招聘区块
- 可展开的职位卡片

### `src/pages/BlogPage.jsx`
### `src/pages/TutorialPage.jsx`
### `src/pages/ResourcePage.jsx`

这三个页面目前是占位页。

也正因如此，它们当前默认不进入 sitemap，也不被索引。

---

## 12. 全局样式系统

### `src/index.css`

这里负责全站级样式，例如：

- 页面背景渐变
- 全局字体
- 玻璃拟态辅助类
- 通用滚动条和文本样式

当前全站背景核心在这里。

### `tailwind.config.js`

这里定义设计 token，例如：

- 颜色语义名
- 字体族
- 圆角体系
- 阴影体系

如果以后要做“保持现有风格但统一升级”，通常应该优先改这里，而不是到处改页面里的十六进制颜色。

---

## 13. 构建与部署文件

### `package.json`

关键脚本：

- `npm run dev`
- `npm run build`
- `npm run preview`

其中最重要的是：

```bash
npm run build
```

它会生成完整静态站点。

### `public/CNAME`

这个文件是为 GitHub Pages 自定义域名准备的。

当前内容是：

```text
maipal.org
```

只要 GitHub Pages 使用这个仓库的 `dist` 产物部署，这个文件就会一起发布。

### `public/.nojekyll`

这是 GitHub Pages 友好文件。

它的作用是告诉 GitHub Pages：

- 不要用 Jekyll 处理这个站点

对于 Vite 这类静态构建产物，这是更稳妥的做法。

---

## 14. 旧 HTML 文件的定位

项目根目录下还有：

- `home.html`
- `project.html`
- `people.html`
- `blog.html`
- `tutorial.html`
- `resource.html`

这些是早期静态参考文件，不是当前线上 React/预渲染架构真正使用的源码。

现在维护网站时，不要再修改这些文件来期待线上站点变化。

真正有效的源码在：

- `src/`
- `scripts/`
- `public/`

---

## 15. 新手维护最常见操作

### 改页面正文

去对应的：

- `src/pages/*.jsx`

### 改顶部导航或底部链接

去：

- `src/data/siteData.js`

### 改页面 SEO 标题、描述、robots、是否进 sitemap

去：

- `src/pageRegistry.jsx`

### 改全站背景或共享视觉效果

去：

- `src/index.css`
- `tailwind.config.js`

### 改静态生成逻辑

去：

- `src/entry-server.jsx`
- `scripts/prerender.mjs`

---

## 16. 开发与验证流程

### 本地开发

```bash
npm install
npm run dev
```

### 生产构建

```bash
npm run build
```

### 本地预览生产版本

```bash
npm run preview
```

### 每次改完最好检查什么

- 页面能否正常打开
- Header 导航跳转是否正常
- 生成的 `dist/*.html` 是否带真实正文
- `dist/sitemap.xml` 是否符合预期
- `dist/robots.txt` 是否符合预期

---

## 17. 这个架构为什么比以前更 SEO 友好

之前如果用纯前端路由，搜索引擎经常先拿到一个几乎空白的 HTML 外壳，再等待 JS 执行。

现在的改造优势是：

- 每个 URL 都有真实 HTML 文件
- 每个页面都有独立 title 和 description
- 每个页面都有 canonical
- 页面正文直接存在首屏源码中
- 自动生成 sitemap 和 robots
- 可以更细粒度控制哪些页面收录、哪些页面不收录
- GitHub Pages 也能直接托管

这就是为什么现在它已经更接近“静态 SEO 站点”，而不只是“好看的 React 页面”。

---

## 18. 后续建议

如果以后还想继续增强 SEO，可以优先做这几件事：

1. 给站点补一张正式的社交分享图，并配置到 `siteData.js`
2. 当 `Blog / Tutorial / Resource` 有真实内容后，把它们重新加入 sitemap 和索引
3. 给每个页面补更细的结构化数据
4. 把图片资源逐步本地化，减少对第三方图片 URL 的依赖
5. 上线后把域名提交到 Google Search Console、Bing Webmaster Tools、百度搜索资源平台

---

## 19. 一句话记住这个项目

这个项目现在是一个：

**用 React 维护页面、用 Vite 构建、用 SSR 入口做静态预渲染、最终输出 SEO 友好多页面静态站点的官网项目。**
