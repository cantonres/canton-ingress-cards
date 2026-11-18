// 操作提示集中维护，避免鉴赏区组件内散落大段说明文案。
// 接收 i18n 的 t()，返回 [标题, 描述] 数组供 OperationTips 渲染。
export const getCardViewerOperationTips = (t) => [
  [t('tips.drag.title'), t('tips.drag.desc')],
  [t('tips.zoom.title'), t('tips.zoom.desc')],
  [t('tips.face.title'), t('tips.face.desc')],
  [t('tips.keyboard.title'), t('tips.keyboard.desc')],
]

// 对比区拥有独立交互，提示项不与单卡鉴赏区混用。
export const getComparisonOperationTips = (t) => [
  [t('tips.select.title'), t('tips.select.desc')],
  [t('tips.sort.title'), t('tips.sort.desc')],
  [t('tips.swap.title'), t('tips.swap.desc')],
  [t('tips.remove.title'), t('tips.remove.desc')],
  [t('tips.compareFace.title'), t('tips.compareFace.desc')],
]
