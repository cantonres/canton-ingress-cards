import { useEffect, useState } from 'react'

// URL hash 用于分享与直接打开指定分类/卡片：#city、#official、#city/007。
// 状态与 hash 双向同步；无 hash 时回退到传入的默认值，且不主动写入 URL。
const parseHash = (hash, validCollectionIds) => {
  const raw = String(hash || '').replace(/^#\/?/, '')
  if (!raw) return null
  const [collectionId, cardId] = raw.split('/')
  if (!validCollectionIds.includes(collectionId)) return null
  return { collectionId, cardId: cardId || null }
}

export default function useHashSelection({ collections, defaultCollectionId, defaultCardId }) {
  const validIds = collections.map((collection) => collection.id)
  const readHash = () => parseHash(window.location.hash, validIds)
  // 使用函数式初始化保证 SSR/测试环境安全（window 存在时才读取）。
  const [selection, setSelection] = useState(() => (
    typeof window === 'undefined' ? null : readHash()
  ))

  useEffect(() => {
    const onHashChange = () => setSelection(readHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // 外部（如标签按钮）改分类时，同步写入 hash，使链接可分享。
  const updateSelection = (next) => {
    setSelection(next)
    const hash = next.cardId
      ? `#${next.collectionId}/${next.cardId}`
      : `#${next.collectionId}`
    if (window.location.hash !== hash) {
      // 用 replaceState 避免每次切换都往历史栈塞记录；hashchange 不会由此触发。
      window.history.replaceState(null, '', hash)
    }
  }

  return {
    collectionId: selection?.collectionId ?? defaultCollectionId,
    cardId: selection?.cardId ?? defaultCardId,
    updateSelection,
  }
}
