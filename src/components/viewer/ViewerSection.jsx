import { lazy, Suspense } from 'react'
import { useI18n } from '../../i18n'
import CardDetails from '../CardDetails'
import CharacterSwitch from '../CharacterSwitch'
import LoadingIndicator from '../common/LoadingIndicator'
import SegmentedControl from '../common/SegmentedControl'
import CharacterHeroInfo from './CharacterHeroInfo'
import { DEFAULT_CARD_ID, DEFAULT_COLLECTION_ID } from '../../data/collections'
import { resolveCardSelection } from '../../data/cardCatalog'
import useHashSelection from '../../hooks/useHashSelection'

// Three.js 体积较大，延迟加载可先展示页面框架和卡片信息。
const CardViewer = lazy(() => import('../card-viewer/CardViewer'))

export default function ViewerSection({ collections }) {
  const { collectionId, cardId, updateSelection } = useHashSelection({
    collections,
    defaultCollectionId: DEFAULT_COLLECTION_ID,
    defaultCardId: DEFAULT_CARD_ID,
  })
  const { collection, card } = resolveCardSelection(collections, collectionId, cardId)
  const { t } = useI18n()

  const changeCollection = (nextId) => updateSelection({ collectionId: nextId, cardId: null })
  const changeCard = (nextCardId) => updateSelection({ collectionId: collection.id, cardId: nextCardId })

  return (
    <main className="relative grid min-h-[calc(100vh-132px)] grid-cols-[minmax(620px,1fr)_380px] max-lg:grid-cols-1 mobile-device:grid-cols-1">
      <section id="viewer" className="viewer relative min-h-[720px] overflow-hidden px-[5vw] pb-8 pt-[62px] sm:max-lg:min-h-[784px] max-sm:min-h-[700px] max-sm:px-[18px] max-sm:py-[30px] mobile-device:min-h-[700px] mobile-device:px-[18px] mobile-device:py-[30px]">
        <SegmentedControl items={collections} activeId={collection.id} onChange={changeCollection} ariaLabel={t('viewer.collectionAria')} />
        {!card ? (
          <div className="grid min-h-[420px] place-items-center text-[12px] tracking-[.2em] text-[#7aa89f]">
            {t('viewer.empty')}
          </div>
        ) : (
          <>
        <div className="mobile-character-switch relative z-20 mx-auto mt-4 w-full max-w-[420px] rounded-xl border border-[#d8f5ec1f] bg-[#071018d9] p-3 backdrop-blur sm:max-w-[680px] lg:hidden">
          <CharacterSwitch card={card} cards={collection.cards} onCardChange={changeCard} />
        </div>
        <CharacterHeroInfo card={card} />
        <Suspense fallback={<CardViewerFallback />}>
          <CardViewer card={card} />
        </Suspense>
          </>
        )}
      </section>
      <CardDetails
        card={card}
        cards={collection.cards}
        collection={collection}
        onCardChange={changeCard}
      />
    </main>
  )
}

function CardViewerFallback() {
  const { t } = useI18n()
  return (
    <div className="absolute inset-[70px_5%_80px_30%] grid place-items-center max-lg:inset-[70px_2%_80px_28%] sm:max-lg:translate-y-16 max-sm:inset-[150px_0_80px] mobile-device:inset-[150px_0_80px]">
      <LoadingIndicator label={t('viewer.loading')} panel labelClassName="text-[11px] tracking-[.28em]" />
    </div>
  )
}
