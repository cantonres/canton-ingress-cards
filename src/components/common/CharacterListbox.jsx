import { useMemo } from 'react'
import { createPortal } from 'react-dom'
import { useI18n } from '../../i18n'
import useCharacterListbox from '../../hooks/useCharacterListbox'
import CharacterListboxPanel from './CharacterListboxPanel'

export default function CharacterListbox({
  cards,
  currentCard,
  selectedIds = [],
  onSelect,
  isDisabled,
  closeOnSelect = true,
  triggerLabel,
  listLabel,
  className = '',
}) {
  const { t } = useI18n()
  const resolvedTriggerLabel = triggerLabel ?? t('list.selectCard')
  const resolvedListLabel = listLabel ?? t('list.cardList')
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds])
  const controller = useCharacterListbox({
    cards,
    currentCard,
    isDisabled,
    onSelect,
    closeOnSelect,
  })
  const {
    closeList,
    handleTriggerKeyDown,
    isOpen,
    listboxId,
    openList,
    rootRef,
    triggerRef,
  } = controller
  const shouldPortalPanel = typeof document !== 'undefined'
    && document.documentElement.classList.contains('mobile-device')

  const panel = isOpen && (
    <CharacterListboxPanel
      {...controller}
      closeOnSelect={closeOnSelect}
      currentCard={currentCard}
      listLabel={resolvedListLabel}
      selectedIdSet={selectedIdSet}
    />
  )

  return (
    <div ref={rootRef} className={`relative min-w-0 ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (isOpen ? closeList() : openList())}
        onKeyDown={handleTriggerKeyDown}
        className={`flex min-h-11 w-full min-w-0 items-center justify-between gap-2 rounded-lg border bg-[#0d2028] px-3 text-left transition-colors ${isOpen ? 'border-[#009e74] shadow-[0_0_0_2px_#009e741f]' : 'border-[#1c3d3a] hover:border-[#655a43]'}`}
        aria-label={resolvedTriggerLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
      >
        <CharacterSummary card={currentCard} />
        <span className={`shrink-0 text-[10px] text-[#009e74] transition-transform ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true">▼</span>
      </button>

      {panel && (shouldPortalPanel ? createPortal(panel, document.body) : panel)}
    </div>
  )
}

function CharacterSummary({ card }) {
  const { cardName, cardCategory } = useI18n()
  return (
    <span className="min-w-0 truncate text-xs tracking-[.08em] text-[#38f0b6]">
      <span className="font-mono">{card.displayId ?? card.id}</span>
      <span className="mx-2 text-[#0c5a4a]">·</span>
      <span>{cardCategory(card) || card?.identity}</span>
      <span className="mx-2 text-[#0c5a4a]">·</span>
      <span>{cardName(card)}</span>
      {card.edition && <span className="ml-2 text-[9px] text-[#00e5a0]">{card.edition}</span>}
    </span>
  )
}
