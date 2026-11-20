import { useI18n } from '../i18n'
import CharacterSwitch from './CharacterSwitch'
import OperationTips from './common/OperationTips'
import { getCardViewerOperationTips } from '../config/operationTips'
import { getCardBadgeClass } from '../config/cardPresentation'

export default function CardDetails({ card, cards, collection, onCardChange }) {
  const { t, cardCategory, cardRegion, cardIntroduction, collectionLabel } = useI18n()
  if (!card) return <aside id="details" className="relative border-l border-[#d8f5ec1f] bg-[#07101840] px-[38px] py-9 max-lg:border-l-0 max-lg:border-t" />
  const stats = card.kind === 'villain'
    ? [[t('details.identity'), card.identity], [t('details.series'), card.series]]
    : [[t('details.category'), cardCategory(card)], [t('details.region'), cardRegion(card)]]

  return (
    <aside
      id="details"
      className="relative border-l border-[#d8f5ec1f] bg-[#07101840] px-[38px] pb-9 pt-8 max-lg:border-l-0 max-lg:border-t max-sm:px-6 max-sm:py-6 mobile-device:border-l-0 mobile-device:border-t mobile-device:px-6 mobile-device:py-6"
    >
      <div className="desktop-character-switch mb-8 hidden lg:block">
        <CharacterSwitch card={card} cards={cards} onCardChange={onCardChange} />
      </div>

      <div className="mb-10 font-mono text-[46px] tracking-[-.06em] text-[#d8f5ec] max-lg:mb-8 max-sm:text-[34px] mobile-device:mb-8 mobile-device:text-[34px]">
        {card.displayId ?? card.id}
        <span className={`ml-3 inline-flex -translate-y-2 rounded-full border px-2.5 py-1 font-serif text-[9px] tracking-[.18em] ${getCardBadgeClass(collection, card)}`}>
          {collectionLabel(collection)}{card.edition ? ` · ${card.edition}` : ''}
        </span>
      </div>

      <div className="border-t border-[#173430]">
        <p className="mb-0 py-5 text-[9px] tracking-[.3em] text-[#5f8d84]">{t('details.basic')}</p>
        <div className="grid grid-cols-2">
          {stats.map(([label, value], index) => (
            <div
              key={label}
              className={`border-y border-[#173430] py-[18px] ${index === 0 ? 'border-r' : 'pl-[18px]'}`}
            >
              <span className="mb-3 block text-[9px] tracking-[.3em] text-[#5f8d84]">{label}</span>
              <b className="text-xs font-medium text-[#b3d8cf]">{value}</b>
            </div>
          ))}
        </div>
      </div>

      <section className="border-[#173430] py-5" aria-labelledby="hero-introduction-title">
        <h2 id="hero-introduction-title" className="mb-3 mt-0 text-[9px] font-normal tracking-[.3em] text-[#5f8d84]">{t('details.introduction')}</h2>
        <p className="m-0 text-xs leading-6 tracking-[.08em] text-[#8fb6ae]">{cardIntroduction(card)}</p>
      </section>

      <OperationTips items={getCardViewerOperationTips(t)} className="mt-5" />
    </aside>
  )
}
