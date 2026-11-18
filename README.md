# Canton 卡册

Ingress 收藏卡的在线存档与 3D 鉴赏站点，收录 Ingress Mission Day 广州（2016.07.30）的 13 张非遗主题收藏卡。

在线访问：<https://cantonres.com/canton-ingress-cards/>

## 功能

- Three.js 3D 卡片：拖动旋转、惯性、缩放、局部平移、正反面切换
- 中 / 英双语界面，可随时切换
- 中文、英文、拼音检索
- 对比区：最多 6 张并排对比、拖动排序、统一翻面
- 移动端单指旋转、双指缩放与平移
- 图片加载失败自动重试

## 技术栈

React 19 · Vite 8 · Tailwind CSS 4 · Three.js · dnd-kit · Vitest

## 本地开发

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev        # http://localhost:5175
npm test           # 单元测试
npm run build      # 生产构建
npm run preview    # 预览构建结果
```

## 部署

推送到 `main` 分支后，由 GitHub Actions 自动构建并部署至 GitHub Pages。

## 版权与致谢

- 卡片为 Ingress Mission Day 广州 2016 的活动物料，插画、文字及相关素材的著作权归 Niantic Inc.、原活动承办方及各位创作者所有。本站为非商业性存档展示，不提供下载；如权利人认为内容不妥，请通过 [Issues](https://github.com/cantonres/canton-ingress-cards/issues) 联系，我们会立即删除。
- Ingress 是 Niantic Inc. 的注册商标，本站与 Niantic Inc. 无官方关联。
- 页面与 3D 交互实现基于 [pwstrick/water-card](https://github.com/pwstrick/water-card)，遵循其 MIT License。
