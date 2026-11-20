import { useI18n } from '../../i18n'
import CharacterListbox from '../common/CharacterListbox'
import SegmentedControl from '../common/SegmentedControl'
import { MAX_COMPARISON_CARDS } from '../../data/collections'

export default function ComparisonPicker({
  collections,
  pickerCollection,
  pickerCard,
  selectedCardIds,
  selectedCount,
  selectionFull,
  onCollectionChange,
  onCardToggle,
}) {
  const { t } = useI18n()
  return (
    <div className="mb-10 rounded-2xl border border-[#d8f5ec1f] bg-[#090c0aa6] p-5">
      <div className="grid grid-cols-[auto_minmax(280px,340px)] justify-center gap-3 max-lg:grid-cols-1 mobile-device:grid-cols-1">
        <SegmentedControl
          items={collections}
          activeId={pickerCollection.id}
          onChange={onCollectionChange}
          variant="boxed"
          ariaLabel={t('compare.collectionAria')}
          className="justify-self-center"
        />

        {pickerCollection.cards.length > 0 && (
        <CharacterListbox
          key={pickerCollection.id}
          cards={pickerCollection.cards}
          currentCard={pickerCard}
          selectedIds={selectedCardIds}
          onSelect={onCardToggle}
          isDisabled={(card) => selectionFull && !selectedCardIds.includes(card.id)}
          closeOnSelect={false}
          triggerLabel={t('compare.selectCards')}
          listLabel={t('compare.listLabel')}
          className="w-full max-w-[300px] justify-self-center"
        />
        )}
      </div>
      <p className="mb-0 mt-3 text-right font-mono text-[9px] tracking-[.12em] text-[#4e756d] sm:text-center">
        {t('compare.selectedCount', { count: selectedCount, max: MAX_COMPARISON_CARDS })}
      </p>
    </div>
  )
}
