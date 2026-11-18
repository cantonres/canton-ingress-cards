import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useComparisonCards from '../../../src/components/comparison/useComparisonCards'
import { MAX_COMPARISON_CARDS } from '../../../src/data/collections'

// 当前对比区为单卡组 heritage，共 13 张卡（001~013）。
const createCard = (id) => ({ id, name: `卡片${id}` })
const collections = [
  {
    id: 'heritage',
    cards: Array.from({ length: 13 }, (_, index) => createCard(String(index + 1).padStart(3, '0'))),
  },
]

const selectedKeysOf = (result) => result.current.selectedCards.map(({ key }) => key)

describe('useComparisonCards', () => {
  it('默认选择四张 heritage 卡片', () => {
    const { result } = renderHook(() => useComparisonCards(collections))
    expect(selectedKeysOf(result)).toEqual([
      'heritage:001',
      'heritage:002',
      'heritage:007',
      'heritage:011',
    ])
  })

  it('在状态层限制最多选择 6 张卡', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    for (const card of collections[0].cards.slice(2, 6)) {
      act(() => result.current.togglePickerCard(card))
    }
    expect(result.current.selectedCards).toHaveLength(MAX_COMPARISON_CARDS)

    act(() => result.current.togglePickerCard(collections[0].cards[7]))
    expect(result.current.selectedCards).toHaveLength(MAX_COMPARISON_CARDS)
  })

  it('拖动后按目标位置更新顺序', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    act(() => result.current.reorderCards('heritage:002', 'heritage:001'))
    expect(selectedKeysOf(result)).toEqual([
      'heritage:002',
      'heritage:001',
      'heritage:007',
      'heritage:011',
    ])
  })

  it('可以将卡片移出对比区', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    act(() => result.current.removeCard('heritage:001'))

    expect(selectedKeysOf(result)).toEqual([
      'heritage:002',
      'heritage:007',
      'heritage:011',
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
    expect(selectedKeysOf(result)[0]).toBe('heritage:011')
  })

  it('连续点击上一张后选中数恒为 4', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    for (let i = 0; i < 10; i += 1) {
      act(() => result.current.comparePreviousCharacter())
      expect(result.current.selectedCards).toHaveLength(4)
    }
    expect(selectedKeysOf(result)[0]).toBe('heritage:004')
  })

  it('首张往前可环绕到最后一张', () => {
    const { result } = renderHook(() => useComparisonCards(collections))

    expect(selectedKeysOf(result)[0]).toBe('heritage:001')
    expect(result.current.canComparePrevious).toBe(true)

    act(() => result.current.comparePreviousCharacter())
    expect(selectedKeysOf(result)[0]).toBe('heritage:013')
    expect(result.current.selectedCards).toHaveLength(4)
  })
})
