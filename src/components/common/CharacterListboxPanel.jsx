import { useI18n } from '../../i18n'

export default function CharacterListboxPanel({
  activeIndex,
  cardIsDisabled,
  closeList,
  closeOnSelect,
  currentCard,
  filteredCards,
  handleListKeyDown,
  handleSearchKeyDown,
  listLabel,
  listRef,
  listboxId,
  optionRefs,
  panelRef,
  searchQuery,
  searchRef,
  selectCard,
  selectedIdSet,
  setActiveIndex,
  setSearchQuery,
}) {
  const { t } = useI18n()
  return (
    <div
      ref={panelRef}
      className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-[240px] rounded-lg border border-[#1a3a34] bg-[#0d110ef5] p-1.5 shadow-[0_20px_50px_#000c] backdrop-blur-md mobile-device:fixed mobile-device:inset-0 mobile-device:z-[80] mobile-device:flex mobile-device:min-h-dvh mobile-device:w-screen mobile-device:min-w-0 mobile-device:flex-col mobile-device:rounded-none mobile-device:border-0 mobile-device:bg-[#070a08f7] mobile-device:p-4 mobile-device:shadow-none"
    >
      <div className="hidden mobile-device:mb-3 mobile-device:flex mobile-device:items-center mobile-device:justify-between mobile-device:gap-3">
        <span className="min-w-0 truncate text-xs tracking-[.18em] text-[#38f0b6]">{listLabel}</span>
        <button
          type="button"
          onClick={() => closeList({ restoreFocus: true })}
          className="shrink-0 rounded-full border border-[#1a3a34] bg-[#0d2028] px-4 py-2 text-[10px] tracking-[.14em] text-[#38f0b6] transition-colors hover:border-[#009e74] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#009e7466]"
        >
          {t('list.done')}
        </button>
      </div>
      <input
        ref={searchRef}
        type="search"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onKeyDown={handleSearchKeyDown}
        placeholder={t('list.searchPlaceholder')}
        className="mb-1.5 h-9 w-full rounded-md border border-[#1c3d3a] bg-[#090d0af2] px-3 text-xs tracking-[.06em] text-[#cdeee4] outline-none transition placeholder:text-[#5f8d84] focus:border-[#009e74] focus:ring-1 focus:ring-[#009e7466]"
        aria-label={t('list.searchAria')}
      />
      <div
        id={listboxId}
        ref={listRef}
        role="listbox"
        aria-label={listLabel}
        aria-multiselectable={!closeOnSelect || undefined}
        onKeyDown={handleListKeyDown}
        className="max-h-64 overflow-y-auto [scrollbar-color:#665a3d_#151a15] [scrollbar-width:thin] mobile-device:max-h-none mobile-device:min-h-0 mobile-device:flex-1 mobile-device:overscroll-contain"
      >
        {filteredCards.map((card, index) => (
          <CharacterOption
            key={card.id}
            card={card}
            current={card.id === currentCard.id}
            selected={selectedIdSet.has(card.id)}
            disabled={cardIsDisabled(card)}
            active={activeIndex === index}
            optionRef={(element) => { optionRefs.current[index] = element }}
            onFocus={() => setActiveIndex(index)}
            onClick={() => selectCard(card)}
          />
        ))}
        {filteredCards.length === 0 && (
          <div className="px-3 py-5 text-center text-xs tracking-[.12em] text-[#777367]">{t('list.noMatch')}</div>
        )}
      </div>
    </div>
  )
}

function CharacterOption({ card, current, selected, disabled, active, optionRef, onFocus, onClick }) {
  const { cardName, cardCategory } = useI18n()
  return (
    <button
      ref={optionRef}
      type="button"
      role="option"
      aria-selected={selected}
      tabIndex={active ? 0 : -1}
      data-current={current}
      disabled={disabled}
      onFocus={onFocus}
      onClick={onClick}
      className={`flex w-full items-center rounded-md px-3 py-2.5 text-left text-xs transition-colors focus-visible:bg-[#00b8842e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#009e74] disabled:cursor-not-allowed disabled:opacity-35 ${current ? 'bg-[#00b8841f]' : 'hover:bg-[#ffffff0a]'}`}
    >
      <span className="w-10 shrink-0 font-mono text-[10px] text-[#73776d]">{card.displayId ?? card.id}</span>
      <span className={`min-w-0 flex-1 truncate ${selected ? 'text-[#38f0b6]' : 'text-[#93bcb4]'}`}>{cardCategory(card) || card?.identity}</span>
      <span className={`ml-3 shrink-0 ${selected ? 'text-[#38f0b6]' : 'text-[#93bcb4]'}`}>{cardName(card)}</span>
      {card.edition && <span className="ml-2 shrink-0 text-[9px] text-[#00e5a0]">{card.edition}</span>}
      <span className={`ml-2 w-4 shrink-0 text-center text-[#38f0b6] ${selected ? 'opacity-100' : 'opacity-0'}`}>✓</span>
    </button>
  )
}
