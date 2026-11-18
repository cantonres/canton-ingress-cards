# Canton 卡册 · Ingress 收藏卡鉴赏

基于 [pwstrick/water-card](https://github.com/pwstrick/water-card) 改造的 Ingress 收藏卡展示站。品牌名 **Canton 卡册**,定位为通用的 Ingress 卡展示/鉴赏平台,可容纳任意主题卡片(不限于当前这批非遗卡)。

在线地址:<https://cantonres.com/canton-ingress-cards/>

## 关于当前卡片

首批收录的是 Ingress Mission Day 广州(2016.07.30)的 13 张非遗主题收藏卡,正面为主题图案(粤剧、醒狮、骑楼等),背面为中文介绍。原始照片存在噪点、摩尔纹与锐度不足,卡图经过 **降噪 → AI 超分 2× → 锐化 → 正反面合并** 的高清重制:

- `hd/`:13 张高清存档图(WebP,正反面横向合并,单张约 1–2 MB,最高 5788×4096)。
- `site/public/assets/heritage/`:网页优化版(合并宽 2000px,总计约 3.1 MB),供 3D 预览加载。
- 工作区根目录的 `photo_*.jpg` 为未改动的原始照片。

13 张卡依次:粤剧、饮茶/早茶、行花街/行花市、扒龙舟、飘色、粤绣、广彩、灰塑、骑楼、榄雕、舞狮、煲汤、南国·广州(序卡)。

## 功能

- Three.js 3D 卡片:拖动旋转、惯性、缩放、局部平移、正反面切换
- 当前角度/缩放状态的卡片图片下载
- 中文 / 拼音检索,完整键盘操作
- 对比区:自选最多 6 张卡并排对比、拖动排序、统一翻面
- 移动端单指旋转、双指缩放与平移
- 图片加载失败自动重试

## 设计与主题

- **Ingress 主题配色**:启蒙青绿(`#00e5a0`)为主强调色,对抗蓝(`#2ab8e0`)为次强调,深蓝黑(`#071018`)为底。
- **背景**:`public/bg-ingress.jpg` 电路纹理图,固定铺满视口并叠加青绿深色蒙版(`src/index.css` 的 `.ingress-bg`)。
- 品牌 logo 印章字为「卡」,页头显示「Canton 卡册 / INGRESS CARDS」。

## 技术栈

React 19 · Vite 8 · Tailwind CSS 4 · Three.js · dnd-kit · Vitest

## 本地开发

需要 Node.js 20.19+ 或 22.12+(推荐 24)。

```bash
cd site
npm install
npm run dev        # http://localhost:5175
npm test           # 单元测试
npm run build      # 生产构建,输出 site/dist
npm run preview    # 预览构建结果
```

## 扩充卡片

卡片数据集中在 `src/data/heritage.js` 的 `cardInfo` 与 `order` 两个结构:在 `cardInfo` 增加主题资料(名称、拼音、类别、属性、简介),并把主题名加入 `order` 数组末尾(顺序即编号)。然后:

1. 用 `tools/build_cards.py` 把新卡的正反面原图重制为合并 WebP:
   ```bash
   python tools/build_cards.py <原图目录> <输出目录> 1415
   ```
   (第三个参数是合并后目标高度;脚本会自动下载 FSRCNN 模型。)
2. 把生成的 `NN.webp`(NN 为两位编号,如 `14.webp`)放入 `site/public/assets/heritage/`。
3. 若需更换卡图目录名或裁切比例,修改 `src/data/heritage.js` 的 `source` 路径与 `src/config/cardImageLayouts.js`。

卡组标签(`src/data/collections.js` 的 `label`)当前为「卡册」,为通用名,无需随主题更改。

## 部署到 GitHub Pages

站点使用 `/canton-ingress-cards/` 作为资源基础路径(`vite.config.js` 的 `base`),对应仓库名 `canton-ingress-cards`。推送到 `main` 后由 `.github/workflows` 中的 Actions 完成构建与 Pages 部署。

若部署到独立域名根目录,构建时设置环境变量 `DEPLOY_TARGET=edgeone`,Vite 会自动改用 `/` 作为 base。

## 与上游的差异

- 卡片数据替换为可扩充的通用卡册(`src/data/heritage.js`),卡组标签为「卡册」。
- 裁切布局改为正反面各占 50% 的横向合并图(`src/config/cardImageLayouts.js`)。
- 对比区「同人物对比」改为按卡片顺序切换相邻主题;所有「人物/水浒」遗留文案已清理。
- 移除《好汉歌》背景音乐;全站改为 Ingress 青绿主题配色与电路纹理背景。
- `base` 路径改为 `/canton-ingress-cards/`。

上游项目版权归 pwstrick 所有,详见其仓库 LICENSE。
