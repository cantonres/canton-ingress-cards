import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n'
import FaceButton from '../common/FaceButton'
import OperationTips from '../common/OperationTips'
import ComparisonGrid from './ComparisonGrid'
import ComparisonPicker from './ComparisonPicker'
import useComparisonCards from './useComparisonCards'
import { getComparisonOperationTips } from '../../config/operationTips'
import { COMPARISON_EXIT_DURATION } from '../../config/comparison'

export default function ComparisonSection({ collections }) {
  const [face, setFace] = useState('front')
  const [isClearing, setIsClearing] = useState(false)
  const clearTimerRef = useRef(null)
  const { t } = useI18n()
  const {
    pickerCollection,
    pickerCard,
    selectedCards,
    selectedPickerCardIds,
    selectionFull,
    changePickerCollection,
    togglePickerCard,
    reorderCards,
    removeCard,
    clearCards,
    compareSameCharacter,
    comparePreviousCharacter,
    compareNextCharacter,
    canComparePrevious,
    canCompareNext,
  } = useComparisonCards(collections)

  useEffect(() => () => {
    if (clearTimerRef.current) window.clearTimeout(clearTimerRef.current)
  }, [])

  const clearWithAnimation = () => {
    if (isClearing || selectedCards.length === 0) return
    setIsClearing(true)
    // 等 CSS 退出动画结束后再真正清空数据，避免卡片直接从 DOM 消失。
    clearTimerRef.current = window.setTimeout(() => {
      clearCards()
      setIsClearing(false)
      clearTimerRef.current = null
    }, COMPARISON_EXIT_DURATION)
  }

  return (
    <section className="border-t border-[#d8f5ec1f] px-[5vw] py-16 max-sm:px-[18px] max-sm:py-10 mobile-device:px-[18px] mobile-device:py-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-9">
          <h2 className="m-0 text-[clamp(34px,5vw,64px)] font-black tracking-[.12em]">{t('compare.title')}</h2>
        </div>

        <ComparisonPicker
          collections={collections}
          pickerCollection={pickerCollection}
          pickerCard={pickerCard}
          selectedCardIds={selectedPickerCardIds}
          selectedCount={selectedCards.length}
          selectionFull={selectionFull}
          onCollectionChange={changePickerCollection}
          onCardToggle={togglePickerCard}
        />

        <ComparisonGrid
          cards={selectedCards}
          face={face}
          onReorder={reorderCards}
          onRemove={removeCard}
          isClearing={isClearing}
        />

        {selectedCards.length > 0 && (
          <ComparisonFaceSwitch
            face={face}
            onChange={setFace}
            onComparePrevious={comparePreviousCharacter}
            onCompareSameCharacter={compareSameCharacter}
            onCompareNext={compareNextCharacter}
            canComparePrevious={canComparePrevious}
            canCompareNext={canCompareNext}
            onClear={clearWithAnimation}
            isClearing={isClearing}
          />
        )}

        <OperationTips items={getComparisonOperationTips(t)} className="mx-auto mt-12 max-w-[760px]" />
      </div>
    </section>
  )
}

function ComparisonFaceSwitch({
  face,
  onChange,
  onComparePrevious,
  onCompareSameCharacter,
  onCompareNext,
  canComparePrevious,
  canCompareNext,
  onClear,
  isClearing,
}) {
  const { t, lang } = useI18n()
  return (
    <div className="mt-9 flex flex-wrap items-center justify-center gap-5 max-sm:gap-4 mobile-device:gap-4" role="group" aria-label={t('compare.groupAria')}>
      <FaceButton label={t('face.front')} mark={lang === 'en' ? 'F' : '正'} size="md" active={face === 'front'} onClick={() => onChange('front')} />
      <span className="font-sans text-[22px] text-[#2ab8e0]" aria-hidden="true">↔</span>
      <FaceButton label={t('face.back')} mark={lang === 'en' ? 'B' : '背'} size="md" active={face === 'back'} onClick={() => onChange('back')} />
      <div className="flex items-center gap-5 max-sm:w-full max-sm:gap-3 mobile-device:w-full mobile-device:gap-3">
        <ComparisonActionButton onClick={onComparePrevious} disabled={!canComparePrevious}>
          {t('compare.prev')}
        </ComparisonActionButton>
        <ComparisonActionButton onClick={onCompareSameCharacter}>
          {t('compare.shuffle')}
        </ComparisonActionButton>
        <ComparisonActionButton onClick={onCompareNext} disabled={!canCompareNext}>
          {t('compare.next')}
        </ComparisonActionButton>
      </div>
      <ComparisonActionButton
        tone="danger"
        onClick={onClear}
        disabled={isClearing}
        active={isClearing}
        className="max-sm:w-full mobile-device:w-full"
      >
        {t(isClearing ? 'compare.clearing' : 'compare.clear')}
      </ComparisonActionButton>
    </div>
  )
}

function ComparisonActionButton({ tone = 'gold', active = false, children, className = '', ...buttonProps }) {
  const tones = {
    gold: 'border-[#1c3d3a] bg-[#0d2028] text-[#38f0b6] hover:border-[#8a7650] hover:text-[#7ff7d0] focus-visible:ring-[#2ab8e066]',
    danger: 'border-[#4d3430] bg-[#15100f] text-[#7fdcf2] hover:border-[#00e5a0] hover:text-[#a8e8f7] focus-visible:ring-[#00e5a066]',
  }
  const activeTone = tone === 'danger' ? 'border-[#00e5a0] text-[#a8e8f7]' : 'border-[#8a7650] text-[#7ff7d0]'

  return (
    <button
      type="button"
      className={`min-h-10 rounded-md border px-5 text-[11px] tracking-[.16em] transition-[border-color,color,opacity,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:scale-95 disabled:opacity-55 max-sm:flex-1 max-sm:px-3 mobile-device:flex-1 mobile-device:px-3 ${tones[tone]} ${active ? activeTone : ''} ${className}`}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
