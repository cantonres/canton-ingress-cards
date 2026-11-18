import { useMemo, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import { DEFAULT_COMPARISON_CARDS, MAX_COMPARISON_CARDS } from '../../data/collections'
import { resolveCardSelection } from '../../data/cardCatalog'
import {
  createComparisonCardKey,
  findComparisonCard,
  parseComparisonCardKey,
} from './comparisonCardKeys'

// 将配置对象预先转为拖拽列表使用的稳定键，后续状态只维护这一种数据格式。
const DEFAULT_SELECTED_KEYS = DEFAULT_COMPARISON_CARDS.map(({ collectionId, cardId }) => (
  createComparisonCardKey(collectionId, cardId)
))

export default function useComparisonCards(collections) {
  const [pickerCollectionId, setPickerCollectionId] = useState(collections[0].id)
  const [pickerCardId, setPickerCardId] = useState(collections[0].cards[0].id)
  const [selectedKeys, setSelectedKeys] = useState(DEFAULT_SELECTED_KEYS)

  const { collection: pickerCollection, card: pickerCard } = resolveCardSelection(
    collections,
    pickerCollectionId,
    pickerCardId,
  )
  const selectedCards = useMemo(() => selectedKeys.flatMap((key) => {
    // 数据更新后可能留下失效 key；flatMap 会安全忽略找不到的卡片。
    const { card } = findComparisonCard(collections, key)
    return card ? [{ key, card }] : []
  }), [collections, selectedKeys])

  const selectedPickerCardIds = selectedKeys.flatMap((key) => {
    const { collectionId, cardId } = parseComparisonCardKey(key)
    return collectionId === pickerCollection.id ? [cardId] : []
  })

  const changePickerCollection = (collectionId) => {
    const { collection: nextCollection } = resolveCardSelection(collections, collectionId)
    setPickerCollectionId(nextCollection.id)
    setPickerCardId(nextCollection.cards[0].id)
  }

  const togglePickerCard = (card) => {
    const key = createComparisonCardKey(pickerCollection.id, card.id)
    setPickerCardId(card.id)
    // 已选项再次点击表示移除；达到上限时保留原数组，避免无意义重渲染。
    setSelectedKeys((items) => items.includes(key)
      ? items.filter((item) => item !== key)
      : items.length < MAX_COMPARISON_CARDS ? [...items, key] : items)
  }

  const reorderCards = (activeKey, overKey) => {
    if (!overKey || activeKey === overKey) return
    setSelectedKeys((items) => {
      const oldIndex = items.indexOf(activeKey)
      const newIndex = items.indexOf(overKey)
      return oldIndex < 0 || newIndex < 0 ? items : arrayMove(items, oldIndex, newIndex)
    })
  }

  const removeCard = (key) => {
    setSelectedKeys((items) => items.filter((item) => item !== key))
  }

  const clearCards = () => {
    setSelectedKeys([])
  }

  // 单卡组：按卡片列表顺序把对比区首张卡替换为相邻主题，其余对比卡保持不变。
  const getAdjacentCard = (offset) => {
    const firstKey = selectedKeys[0]
    if (!firstKey) return null
    const { collection, card } = findComparisonCard(collections, firstKey)
    if (!collection || !card) return null
    const list = collection.cards ?? []
    const currentIndex = list.findIndex((item) => item.id === card.id)
    if (currentIndex < 0) return null
    const nextIndex = (currentIndex + offset + list.length) % list.length
    return { collectionId: collection.id, card: list[nextIndex] }
  }

  const shiftFirstCard = (offset) => {
    const target = getAdjacentCard(offset)
    if (!target) return
    const nextKey = createComparisonCardKey(target.collectionId, target.card.id)
    // 首卡换成相邻卡：相邻卡已在选中列表则前移去重，否则淘汰原首卡，数量保持恒定。
    setSelectedKeys((items) => (
      items.includes(nextKey)
        ? [nextKey, ...items.filter((key) => key !== nextKey)]
        : [nextKey, ...items.slice(1)]
    ))
  }

  // 上一张顺序后退一步，下一张前进一步，换一张跳两步以示区分（均替换首卡，数量恒定）。
  const comparePreviousCharacter = () => shiftFirstCard(-1)
  const compareNextCharacter = () => shiftFirstCard(1)
  const compareSameCharacter = () => shiftFirstCard(2)

  return {
    pickerCollection,
    pickerCard,
    selectedCards,
    selectedPickerCardIds,
    selectionFull: selectedKeys.length >= MAX_COMPARISON_CARDS,
    changePickerCollection,
    togglePickerCard,
    reorderCards,
    removeCard,
    clearCards,
    compareSameCharacter,
    comparePreviousCharacter,
    compareNextCharacter,
    canComparePrevious: Boolean(getAdjacentCard(-1)),
    canCompareNext: Boolean(getAdjacentCard(1)),
  }
}
