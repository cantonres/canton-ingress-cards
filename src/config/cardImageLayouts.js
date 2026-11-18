// 未配置或拼写错误的 layoutName 回退到普卡裁切，保证卡图仍可展示。
const DEFAULT_LAYOUT = 'heritage'

// 卡图裁切的唯一数据源。Ingress 卡为正反面横向合并图：正面在左、背面在右，各占 50%。
const CARD_IMAGE_LAYOUTS = {
  heritage: {
    front: { repeat: [0.5, 1], offset: [0, 0] },
    back: { repeat: [0.5, 1], offset: [0.5, 0] },
  },
}

export function getCardImageLayout(layoutName) {
  return CARD_IMAGE_LAYOUTS[layoutName] ?? CARD_IMAGE_LAYOUTS[DEFAULT_LAYOUT]
}

export function getCardFaceBackgroundStyle(layoutName, side) {
  const face = getCardImageLayout(layoutName)[side]
  const [repeatX, repeatY] = face.repeat
  const [offsetX, offsetY] = face.offset

  return {
    // background-size 是可见区域比例的倒数；position 需要按剩余的可移动空间换算。
    backgroundSize: `${toPercent(1 / repeatX)} ${toPercent(1 / repeatY)}`,
    backgroundPosition: `${toPositionPercent(offsetX, repeatX)} ${toPositionPercent(offsetY, repeatY)}`,
  }
}

const toPercent = (value) => `${Number((value * 100).toFixed(1))}%`

const toPositionPercent = (offset, repeat) => (
  repeat === 1 ? '0%' : toPercent(offset / (1 - repeat))
)
