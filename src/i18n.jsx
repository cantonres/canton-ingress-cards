import { createContext, useContext, useEffect, useState } from 'react'

// Canton 卡册全站双语字典。仅收录用户可见文案；代码注释不在范围内。
// 语言偏好写入 localStorage，隐私模式下读写均降级为「仅本次会话有效」。
const ZH = {
  'page.title': 'Canton 卡册 · Ingress 收藏卡存档',
  brand: 'Canton 卡册',
  'top.homeAria': 'Canton 卡册首页',
  'top.navAria': '主导航',
  'collection.heritage': '卡册',

  // 顶栏 / 页脚
  'nav.appreciate': '存档',
  'nav.compare': '对比',
  'top.langTitle': '中文 / English',
  'top.githubTitle': 'GitHub',
  'top.disclaimerTitle': '免责声明',
  'top.aboutHeading': '关于本站',
  'top.disclaimer': '本站为爱好者自发建立的非商业性活动存档，与 Niantic Inc. 及原活动承办方无官方关联；Ingress 是 Niantic Inc. 的注册商标。',
  'top.rights': '卡面插画、文字及相关素材的著作权归 Niantic Inc.、原活动承办方及各位创作者所有，本站仅作存档展示之用。',
  'top.takedown': '本站不提供下载、不作任何商业用途。如权利人认为内容不妥，请通过 GitHub 联系我们，我们将于收到通知后立即删除。',
  'top.aboutGithub': '在 GitHub 上查看本项目',
  'top.creditPrefix': '卡面展示与 3D 交互方案致谢 ',
  'top.creditLink': '水浒卡鉴赏室',
  'top.creditSuffix': ' 项目。',
  'top.close': '关闭',
  'footer.text': 'CANTON 卡册 · INGRESS 收藏卡高清重制存档',

  // 通用控件
  'face.front': '正面',
  'face.back': '背面',
  'mode.pan': '移动',
  'mode.rotate': '翻转',
  'switch.title': '切换卡片',
  'switch.prev': '上一张卡片',
  'switch.next': '下一张卡片',
  'list.selectCard': '选择卡片',
  'list.cardList': '卡片列表',
  'list.done': '完成',
  'list.searchPlaceholder': '搜索中文或拼音',
  'list.searchAria': '搜索卡片',
  'list.noMatch': '没有匹配卡片',
  'error.image': '图片加载失败',
  'error.retry': '重新加载',
  'tips.heading': '操作提示',
  'control.optionSwitch': '选项切换',

  // 存档区
  'viewer.collectionAria': '卡片分类',
  'viewer.loading': '预览加载中…',
  'viewer.aria': '{name}收藏卡 three.js 360 度预览区，拖动旋转，滚轮或双指缩放',
  'viewer.loadingCard': '卡片载入中…',
  'viewer.retrying': '加载失败，正在重试…',
  'viewer.error': '卡片图片加载失败',
  'control.dragFlip': '拖动翻转',
  'control.dragMode': '拖动{mode}',
  'control.switchTip': '顶部按钮切换模式',
  'control.zoomTip': '滚轮 / 双指放大',
  'control.zoomOut': '缩小卡片',
  'control.zoomIn': '放大卡片',
  'control.downloadLabel': '下载当前样子的卡片',
  'control.download': '下载',
  'focus.modeAria': '放大后的拖动模式',
  'focus.exitLabel': '退出放大模式',
  'focus.exit': '退出放大',
  'details.basic': '基础信息',
  'details.identity': '身份',
  'details.series': '系列',
  'details.category': '类别',
  'details.region': '属性',
  'details.introduction': '卡片简介',

  // 对比区
  'compare.title': '对比区',
  'compare.groupAria': '统一切换卡片正反面与顺序换卡',
  'compare.prev': '上一张',
  'compare.shuffle': '换一张',
  'compare.next': '下一张',
  'compare.clear': '清空对比区',
  'compare.clearing': '清空中',
  'compare.empty': '请选择卡片加入对比',
  'compare.gridAria': '已选对比卡片，可拖动排序',
  'compare.collectionAria': '对比卡片分类',
  'compare.selectCards': '选择要加入对比的卡片',
  'compare.listLabel': '对比卡片列表',
  'compare.selectedCount': '已选择 {count} / {max}',
  'compare.cardAria': '{name}，拖动调整顺序',
  'compare.cardFrontAria': '{name}正面',
  'compare.cardBackAria': '{name}背面',
  'compare.cardLoading': '{name}卡片加载中',
  'compare.cardRetrying': '{name}卡片重新加载中',
  'compare.cardRemove': '将{name}移出对比区',
  'compare.delete': '删除',
  'app.compareLoading': '对比区加载中…',

  // 操作提示
  'tips.drag.title': '拖动',
  'tips.drag.desc': '正常状态下拖动可 360° 翻转卡片；放大后默认翻转查看局部，也可通过顶部的“移动 / 翻转”切换拖动模式。',
  'tips.zoom.title': '缩放',
  'tips.zoom.desc': '使用鼠标滚轮、底部“− / ＋”按钮或双指捏合缩放；双指移动还可查看放大后的局部。',
  'tips.face.title': '正反面',
  'tips.face.desc': '点击底部“正面 / 背面”快速切换，双击卡片也可翻面。',
  'tips.keyboard.title': '键盘',
  'tips.keyboard.desc': '← / → 每次旋转 30°，空格键翻面，+ / − 缩放，Esc 退出放大。',
  'tips.download.title': '下载',
  'tips.download.desc': '点击底部“下载”保存当前角度和缩放状态下的卡片图片。',
  'tips.select.title': '选择',
  'tips.select.desc': '点击卡片列表中的卡片，即可加入或移出对比，最多可同时选择 6 张。',
  'tips.sort.title': '排序',
  'tips.sort.desc': '按住卡片并拖动到目标位置，可调整对比顺序；手机端长按片刻后再拖动。',
  'tips.swap.title': '换组',
  'tips.swap.desc': '点击“上一张 / 换一张 / 下一张”可按卡片顺序切换相邻主题。',
  'tips.remove.title': '删除',
  'tips.remove.desc': '在下拉框中再选择一次指定卡片或点击卡片出现删除按钮，再点一次隐藏。',
  'tips.compareFace.title': '正反面',
  'tips.compareFace.desc': '点击卡片下方的“正面 / 背面”，可统一翻转当前对比中的全部卡片。',
}

const EN = {
  'page.title': 'Canton Cards · Ingress collectible card archive',
  brand: 'Canton Cards',
  'top.homeAria': 'Canton Cards home',
  'top.navAria': 'Main navigation',
  'collection.heritage': 'Collection',

  'nav.appreciate': 'Archive',
  'nav.compare': 'Compare',
  'top.langTitle': '中文 / English',
  'top.githubTitle': 'GitHub',
  'top.disclaimerTitle': 'Disclaimer',
  'top.aboutHeading': 'About this site',
  'top.disclaimer': 'A non-commercial archive run by fans, not affiliated with Niantic Inc. or the original event organizer. Ingress is a registered trademark of Niantic Inc.',
  'top.rights': 'Artwork, text and other materials remain the copyright of Niantic Inc., the original event organizer and their creators; this site displays them for archival purposes only.',
  'top.takedown': 'No downloads are offered and no commercial use is made. Rights holders may contact us via GitHub and we will remove the content promptly upon notice.',
  'top.aboutGithub': 'View this project on GitHub',
  'top.creditPrefix': 'Card gallery and 3D interaction are based on ',
  'top.creditLink': 'pwstrick’s Water Margin Cards Gallery',
  'top.creditSuffix': ' project, with thanks.',
  'top.close': 'Close',
  'footer.text': 'CANTON CARDS · HD Ingress collectible card archive',

  'face.front': 'Front',
  'face.back': 'Back',
  'mode.pan': 'pan',
  'mode.rotate': 'rotate',
  'switch.title': 'Switch card',
  'switch.prev': 'Previous card',
  'switch.next': 'Next card',
  'list.selectCard': 'Select card',
  'list.cardList': 'Card list',
  'list.done': 'Done',
  'list.searchPlaceholder': 'Search name or pinyin',
  'list.searchAria': 'Search cards',
  'list.noMatch': 'No matching cards',
  'error.image': 'Failed to load image',
  'error.retry': 'Retry',
  'tips.heading': 'Controls',
  'control.optionSwitch': 'Option switch',

  'viewer.collectionAria': 'Card collections',
  'viewer.loading': 'Loading preview…',
  'viewer.aria': '360° three.js preview of {name}: drag to rotate, scroll or pinch to zoom',
  'viewer.loadingCard': 'Loading card…',
  'viewer.retrying': 'Failed to load, retrying…',
  'viewer.error': 'Failed to load card image',
  'control.dragFlip': 'Drag to flip',
  'control.dragMode': 'Drag to {mode}',
  'control.switchTip': 'Switch mode with top buttons',
  'control.zoomTip': 'Scroll / pinch to zoom',
  'control.zoomOut': 'Zoom out',
  'control.zoomIn': 'Zoom in',
  'control.downloadLabel': 'Download card at current angle',
  'control.download': 'Download',
  'focus.modeAria': 'Drag mode in zoom view',
  'focus.exitLabel': 'Exit zoom mode',
  'focus.exit': 'Exit zoom',
  'details.basic': 'Basic info',
  'details.identity': 'Identity',
  'details.series': 'Series',
  'details.category': 'Category',
  'details.region': 'Attribute',
  'details.introduction': 'Card introduction',

  'compare.title': 'Compare',
  'compare.groupAria': 'Flip all cards and switch card order',
  'compare.prev': 'Previous',
  'compare.shuffle': 'Shuffle',
  'compare.next': 'Next',
  'compare.clear': 'Clear comparison',
  'compare.clearing': 'Clearing',
  'compare.empty': 'Select cards to compare',
  'compare.gridAria': 'Selected cards, drag to reorder',
  'compare.collectionAria': 'Card collection',
  'compare.selectCards': 'Select cards to compare',
  'compare.listLabel': 'Compare card list',
  'compare.selectedCount': 'Selected {count} / {max}',
  'compare.cardAria': '{name}, drag to reorder',
  'compare.cardFrontAria': '{name} front',
  'compare.cardBackAria': '{name} back',
  'compare.cardLoading': '{name} card loading',
  'compare.cardRetrying': '{name} card reloading',
  'compare.cardRemove': 'Remove {name} from comparison',
  'compare.delete': 'Remove',
  'app.compareLoading': 'Loading comparison…',

  'tips.drag.title': 'Drag',
  'tips.drag.desc': 'Drag to flip the card 360°; in zoom view dragging rotates by default and the top buttons switch between pan and rotate.',
  'tips.zoom.title': 'Zoom',
  'tips.zoom.desc': 'Zoom with the mouse wheel, the − / ＋ buttons, or a pinch gesture; drag with two fingers to inspect a zoomed area.',
  'tips.face.title': 'Front / Back',
  'tips.face.desc': 'Use the Front / Back buttons to flip instantly; double-clicking the card flips it too.',
  'tips.keyboard.title': 'Keyboard',
  'tips.keyboard.desc': '← / → rotate by 30°, Space flips, + / − zoom, Esc exits zoom mode.',
  'tips.download.title': 'Download',
  'tips.download.desc': 'Click Download to save the card image at the current angle and zoom level.',
  'tips.select.title': 'Select',
  'tips.select.desc': 'Click a card in the list to add or remove it from the comparison, up to 6 cards at a time.',
  'tips.sort.title': 'Reorder',
  'tips.sort.desc': 'Drag a card to a new position to reorder; on touch screens long-press before dragging.',
  'tips.swap.title': 'Swap',
  'tips.swap.desc': 'Click Previous / Shuffle / Next to cycle through neighbouring themes in card order.',
  'tips.remove.title': 'Remove',
  'tips.remove.desc': 'Select a card again in the dropdown or click it to reveal the remove button, then click once more to hide.',
  'tips.compareFace.title': 'Front / Back',
  'tips.compareFace.desc': 'Use the Front / Back buttons to flip all compared cards together.',
}

const STORAGE_KEY = 'canton-cards-lang'

const I18nContext = createContext(null)

export function I18nProvider({ children, onChange }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'zh'
    } catch {
      return 'zh'
    }
  })

  const setLang = (next) => {
    const value = next === 'en' ? 'en' : 'zh'
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // 隐私模式：仅本次会话生效。
    }
    setLangState(value)
  }

  // 首次挂载（含隐私模式回退）与后续切换都同步对外通知，便于更新 document.title。
  useEffect(() => {
    onChange?.(lang)
  }, [lang, onChange])

  const dict = lang === 'en' ? EN : ZH
  const t = (key, params) => {
    let str = dict[key] ?? ZH[key] ?? key
    if (params) {
      for (const [name, value] of Object.entries(params)) {
        str = str.replaceAll(`{${name}}`, String(value))
      }
    }
    return str
  }

  return (
    <I18nContext.Provider value={createValue(lang, t, setLang)}>
      {children}
    </I18nContext.Provider>
  )
}

function createValue(lang, t, setLang) {
  const localized = (en, zh) => (lang === 'en' ? en : zh)
  return {
    lang,
    setLang,
    t,
    // 卡片数据随语言切换：英文字段缺失时回退到中文字段。
    cardName: (card) => localized(card?.nameEn, card?.name) ?? '',
    cardCategory: (card) => localized(card?.categoryEn, card?.nickname) ?? '',
    cardRegion: (card) => localized(card?.regionEn, card?.star) ?? '',
    cardIntroduction: (card) => localized(card?.introductionEn, card?.introduction) ?? '',
    collectionLabel: (collection) => localized(collection?.labelEn, collection?.label) ?? '',
  }
}

// 无 Provider 时（如组件单测）回退到中文，保证组件仍可独立渲染。
const FALLBACK = createValue('zh', (key, params) => {
  let str = ZH[key] ?? key
  if (params) {
    for (const [name, value] of Object.entries(params)) str = str.replaceAll(`{${name}}`, String(value))
  }
  return str
}, () => {})

export function useI18n() {
  return useContext(I18nContext) ?? FALLBACK
}
