import { cards as heritageCards } from './heritage'

// 鉴赏区首次进入选中第一张卡（南国 · 广州）。
export const DEFAULT_COLLECTION_ID = 'city'
export const DEFAULT_CARD_ID = '001'
// 对比区最多同时展示的卡片数，兼顾桌面排版与移动端贴图内存。
export const MAX_COMPARISON_CARDS = 6

// 对比区默认展示四张不同主题的卡片，进入即可看到版面效果。
export const DEFAULT_COMPARISON_CARDS = [
  { collectionId: 'city', cardId: '001' },
  { collectionId: 'city', cardId: '002' },
  { collectionId: 'city', cardId: '007' },
  { collectionId: 'city', cardId: '011' },
]

// 按卡片类型元信息（kind）派生三个筛选视图，复用卡组机制实现快速筛选。
// 玩家 Biocard 暂无卡片，保留空卡组以便日后补充。
const byKind = (kind) => heritageCards.filter((card) => card.kind === kind)

export const collections = [
  {
    id: 'city',
    label: '城市卡',
    labelEn: 'City Cards',
    cards: byKind('Mission Day'),
    presentation: { badgeTone: 'gold' },
  },
  {
    id: 'official',
    label: '官方卡',
    labelEn: 'Official Cards',
    cards: byKind('NianticOfficial'),
    presentation: { badgeTone: 'blue' },
  },
  {
    id: 'biocard',
    label: '玩家卡',
    labelEn: 'Player Biocards',
    cards: byKind('Biocard'),
    presentation: { badgeTone: 'green' },
  },
]
