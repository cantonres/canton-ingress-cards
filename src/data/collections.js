import { cards as heritageCards } from './heritage'

// 鉴赏区首次进入选中第一张卡（粤剧）。
export const DEFAULT_COLLECTION_ID = 'heritage'
export const DEFAULT_CARD_ID = '001'
// 对比区最多同时展示的卡片数，兼顾桌面排版与移动端贴图内存。
export const MAX_COMPARISON_CARDS = 6

// 对比区默认展示四张不同主题的卡片，进入即可看到版面效果。
export const DEFAULT_COMPARISON_CARDS = [
  { collectionId: 'heritage', cardId: '001' },
  { collectionId: 'heritage', cardId: '002' },
  { collectionId: 'heritage', cardId: '007' },
  { collectionId: 'heritage', cardId: '011' },
]

export const collections = [
  {
    id: 'heritage',
    label: '卡册',
    labelEn: 'Collection',
    cards: heritageCards,
    presentation: { badgeTone: 'gold' },
  },
]
