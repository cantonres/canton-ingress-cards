import { useI18n } from '../i18n'
import CharacterListbox from './common/CharacterListbox'

export default function CharacterSwitch({ card, cards, onCardChange }) {
  const { t } = useI18n()
  const currentIndex = cards.findIndex((item) => item.id === card.id)

  const selectOffset = (offset) => {
    // 加上 cards.length 后取模，让首尾卡片可以循环切换。
    const nextIndex = (currentIndex + offset + cards.length) % cards.length
    onCardChange(cards[nextIndex].id)
  }

  return (
    <div>
      <span className="mb-3 block text-[9px] tracking-[.3em] text-[#5f8d84]">{t('switch.title')}</span>
      <div className="grid grid-cols-[42px_minmax(0,1fr)_42px] gap-2">
        <button
          type="button"
          onClick={() => selectOffset(-1)}
          className="rounded border border-[#1c3d3a] bg-[#0d2028] text-lg text-[#8fb6ae] transition hover:border-[#8a7650] hover:text-[#7ff7d0]"
          aria-label={t('switch.prev')}
        >
          ‹
        </button>
        <CharacterListbox
          cards={cards}
          currentCard={card}
          selectedIds={[card.id]}
          onSelect={(item) => onCardChange(item.id)}
          className="h-full"
        />
        <button
          type="button"
          onClick={() => selectOffset(1)}
          className="rounded border border-[#1c3d3a] bg-[#0d2028] text-lg text-[#8fb6ae] transition hover:border-[#8a7650] hover:text-[#7ff7d0]"
          aria-label={t('switch.next')}
        >
          ›
        </button>
      </div>
    </div>
  )
}
