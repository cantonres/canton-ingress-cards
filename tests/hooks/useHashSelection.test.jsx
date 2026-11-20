import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import useHashSelection from '../../src/hooks/useHashSelection'

const collections = [{ id: 'city' }, { id: 'official' }, { id: 'biocard' }]
const defaults = { collections, defaultCollectionId: 'city', defaultCardId: '001' }

describe('useHashSelection', () => {
  beforeEach(() => {
    window.location.hash = ''
  })

  it('无 hash 时回退到默认分类与卡片', () => {
    const { result } = renderHook(() => useHashSelection(defaults))
    expect(result.current.collectionId).toBe('city')
    expect(result.current.cardId).toBe('001')
  })

  it('根据 #official 直接打开对应分类', () => {
    window.location.hash = '#official'
    const { result } = renderHook(() => useHashSelection(defaults))
    expect(result.current.collectionId).toBe('official')
    expect(result.current.cardId).toBe('001')
  })

  it('根据 #city/007 直接打开指定卡片', () => {
    window.location.hash = '#city/007'
    const { result } = renderHook(() => useHashSelection(defaults))
    expect(result.current.collectionId).toBe('city')
    expect(result.current.cardId).toBe('007')
  })

  it('非法分类 hash 被忽略并回退默认值', () => {
    window.location.hash = '#unknown'
    const { result } = renderHook(() => useHashSelection(defaults))
    expect(result.current.collectionId).toBe('city')
  })

  it('切换分类时写入 hash 并清空卡片段', () => {
    const { result } = renderHook(() => useHashSelection(defaults))
    act(() => result.current.updateSelection({ collectionId: 'official', cardId: null }))
    expect(result.current.collectionId).toBe('official')
    expect(window.location.hash).toBe('#official')
  })

  it('切换卡片时写入 #分类/卡片 形式的 hash', () => {
    const { result } = renderHook(() => useHashSelection(defaults))
    act(() => result.current.updateSelection({ collectionId: 'city', cardId: '013' }))
    expect(window.location.hash).toBe('#city/013')
  })

  it('浏览器前进后退触发 hashchange 时同步状态', () => {
    const { result } = renderHook(() => useHashSelection(defaults))
    act(() => { window.location.hash = '#official' })
    act(() => window.dispatchEvent(new HashChangeEvent('hashchange')))
    expect(result.current.collectionId).toBe('official')
  })
})
