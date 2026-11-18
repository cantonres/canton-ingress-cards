export const normalizeSearchText = (value) => String(value ?? '')
  .toLowerCase()
  .replace(/\s+/g, '')

export const getRomanizedInitials = (value) => String(value ?? '')
  .split(/\s+/)
  .filter(Boolean)
  .map((word) => word[0])
  .join('')
  .toLowerCase()

// 同时收录中文、英文、完整拼音和拼音首字母，统一生成一次可模糊匹配的搜索语料。
export const getCardSearchText = (card) => normalizeSearchText([
  card.id,
  card.displayId,
  card.name,
  card.nameEn,
  card.nickname,
  card.categoryEn,
  card.theme,
  card.themeEn,
  card.themeRegion,
  card.themeRegionEn,
  card.identity,
  card.edition,
  card.star,
  card.regionEn,
  card.series,
  card.introductionEn,
  card.romanizedName,
  getRomanizedInitials(card.romanizedName),
].filter(Boolean).join(' '))
