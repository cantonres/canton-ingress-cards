const BADGE_TONE_CLASSES = {
  neutral: 'border-[#73797066] text-[#7aa89f]',
  gold: 'border-[#2ab8e080] bg-[#2ab8e014] text-[#38f0b6]',
  silver: 'border-[#7fdcf280] bg-[#7fdcf214] text-[#a8e8f7]',
  danger: 'border-[#00e5a080] bg-[#00e5a014] text-[#5fd0ee]',
}

export function getCardBadgeClass(collection, card) {
  const presentation = collection.presentation ?? {}
  // 卡片类型配色优先于卡组默认配色，例如普卡中的反派使用 danger。
  const tone = presentation.kindBadgeTones?.[card.kind]
    ?? presentation.badgeTone
    ?? 'neutral'

  return BADGE_TONE_CLASSES[tone] ?? BADGE_TONE_CLASSES.neutral
}
