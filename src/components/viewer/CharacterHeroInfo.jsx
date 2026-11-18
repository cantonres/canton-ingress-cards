import { useI18n } from '../../i18n'

export default function CharacterHeroInfo({ card }) {
  const { cardName, cardCategory, cardRegion } = useI18n()
  const subtitle = card.kind === 'villain'
    ? `${card.identity} · ${card.series}`
    : `${cardCategory(card)} · ${cardRegion(card)}`

  return (
    <div className="absolute left-[6vw] top-[28%] z-[2] max-sm:hidden mobile-device:hidden">
      <p className="mb-[15px] text-xs tracking-[.45em] text-[#9b9f96]">{subtitle}</p>
      <h1 className="m-0 text-[clamp(58px,7vw,104px)] font-black leading-none tracking-[.08em] [text-shadow:0_12px_35px_#000]">{cardName(card)}</h1>
      <p className="font-mono text-[10px] tracking-[.35em] text-[#746f63]">
        {card.romanizedName} <em className="text-[#9a2e25]">·</em> NO. {card.displayId ?? card.id}{card.edition ? ` · ${card.edition}` : ''}
      </p>
    </div>
  )
}
