import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useComparisonCards from '../../../src/components/comparison/useComparisonCards'
import { MAX_COMPARISON_CARDS } from '../../../src/data/collections'

// 默认卡组 city 共 13 张卡，另有 official 与空的 biocard 两组。
const createCard = (id) => ({ id, name: `卡片${id}` })
const makeCards = (n) => Array.from({ length: n }, (_, index) => createCard(String(index + 1).padStart(3, '0')))
const collections = [
  { id: 'city', cards: makeCards(13) },
  { id: 'official', cards: makeCards(61) },
  { id: 'biocard', cards: [] },
]

const selectedKeysOf = (result) => result.current.selectedCards.map(({ key }) => key)

describe('useComparisonCards', () => {
  it('默认选择四张城市卡', () => {
    const { result } = renderHook(() => useComparisonCards(collections))
    expect(selectedKeysOf(result)).toEqual([
      'city:001',
      'city:002',
      'city:007',
      'city:011',
    ])
  })

  it('切换分类时把已选四张卡重置为该分类的前四张', () => {
    const { result } = renderHook(() => useComparisonCards(collections))
    act(() => result.current.changePickerCollection('official'))
    expect(selectedKeysOf(result)).toEqual([
      'official:001',
      'official:002',
      'official:003',
      'official:004',
    ])
    expect(result.current.pickerCollection.id).toBe('official')
  })

  it('切换到空分类时清空已选卡且不报错', () => {
    const { result } = renderHook(() => useComparisonCards(collections))
    act(() => result.current.changePickerCollection('biocard'))
    expect(selectedKeysOf(result)).toEqual([])
    expect(result.current.pickerCard).toBeFalsy()
    expect(result.current.canComparePrevious).toBe(false)
  })

  it('在状态层限制最多选择 6 张卡', () => {    const { result } = renderHook(() => useComparisonCards(collections))

    for (const card of collections[0].cards.slice(2, 6)) {
      act(() => result.current.togglePickerCard(card))
    }
    expect(result.current.selectedCards).toHaveLength(MAX_COMPARISON_CARDS)

    act(() => result.current.togglePickerCard(collections[0].cards[7]))
    expect(result.current.selectedCards).toHaveLength(MAX_COMPARISON_CARDS)
  })

  it('拖动后按目标位置更新顺序', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    act(() => result.current.reorderCards('city:002', 'city:001'))
    expect(selectedKeysOf(result)).toEqual([
      'city:002',
      'city:001',
      'city:007',
      'city:011',
    ])
  })

  it('可以将卡片移出对比区', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    act(() => result.current.removeCard('city:001'))

    expect(selectedKeysOf(result)).toEqual([
      'city:002',
      'city:007',
      'city:011',
    ])
  })

  it('可以清空对比区', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    act(() => result.current.clearCards())

    expect(result.current.selectedCards).toEqual([])
    expect(result.current.selectionFull).toBe(false)
  })

  it('连续点击下一张后选中数恒为 4', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    for (let i = 0; i < 10; i += 1) {
      act(() => result.current.compareNextCharacter())
      expect(result.current.selectedCards).toHaveLength(4)
    }
    expect(selectedKeysOf(result)[0]).toBe('city:011')
  })

  it('连续点击上一张后选中数恒为 4', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    for (let i = 0; i < 10; i += 1) {
      act(() => result.current.comparePreviousCharacter())
      expect(result.current.selectedCards).toHaveLength(4)
    }
    expect(selectedKeysOf(result)[0]).toBe('city:004')
  })

  it('首张往前可环绕到最后一张', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    expect(selectedKeysOf(result)[0]).toBe('city:001')
    expect(result.current.canComparePrevious).toBe(true)

    act(() => result.current.comparePreviousCharacter())
    expect(selectedKeysOf(result)[0]).toBe('city:013')
    expect(result.current.selectedCards).toHaveLength(4)
  })
})
