import { describe, expect, it } from 'vitest'
import { getCardFaceBackgroundStyle, getCardImageLayout } from '../../src/config/cardImageLayouts'

describe('cardImageLayouts', () => {
  it('未知裁切配置回退到 heritage 配置', () => {
    expect(getCardImageLayout('missing')).toEqual(getCardImageLayout('heritage'))
  })

  it('heritage 正反面按左右等分裁切', () => {
    expect(getCardImageLayout('heritage')).toEqual({
      front: { repeat: [0.5, 1], offset: [0, 0] },
      back: { repeat: [0.5, 1], offset: [0.5, 0] },
    })
  })

  it('将 heritage 正面裁切转换为 CSS 背景参数', () => {
    expect(getCardFaceBackgroundStyle('heritage', 'front')).toEqual({
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 0%',
    })
  })

  it('将 heritage 背面裁切转换为 CSS 背景参数', () => {
    expect(getCardFaceBackgroundStyle('heritage', 'back')).toEqual({
      backgroundSize: '200% 100%',
      backgroundPosition: '100% 0%',
    })
  })

  it('将奖闪正面裁切转换为 CSS 背景参数', () => {
    expect(getCardFaceBackgroundStyle('flash_prize', 'front')).toEqual({
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 0%',
    })
  })

  it('将冷烫卡图按左右等分裁切', () => {
    expect(getCardFaceBackgroundStyle('code_perm', 'back')).toEqual({
      backgroundSize: '200% 100%',
      backgroundPosition: '100% 0%',
    })
  })

  it('将立绘卡图按左右等分裁切', () => {
    expect(getCardFaceBackgroundStyle('character_art', 'front')).toEqual({
      backgroundSize: '200% 100%',
      backgroundPosition: '0% 0%',
    })
  })
})
