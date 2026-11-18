import { useEffect, useRef, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useI18n } from '../../i18n'
import ImageLoadOverlay from '../common/ImageLoadOverlay'
import { getCardFaceBackgroundStyle } from '../../config/cardImageLayouts'
import { COMPARISON_EXIT_DURATION } from '../../config/comparison'
import useRetryableImageSource from '../../hooks/useRetryableImageSource'

export default function ComparisonCard({ card, comparisonKey, face, onRemove }) {
  const [loadState, setLoadState] = useState('loading')
  const [showActions, setShowActions] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [faceLayoutReady, setFaceLayoutReady] = useState(false)
  const [faceTransitionReady, setFaceTransitionReady] = useState(false)
  const removeTimerRef = useRef(null)
  const { t, cardName } = useI18n()
  const cardLabel = cardName(card)
  const { imageSource, retry: retryLoad, isAutoRetrying } = useRetryableImageSource(
    loadState,
    card.images.source,
  )
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: comparisonKey })
  const imageStyle = (side) => ({
    backgroundImage: `url("${imageSource}")`,
    backgroundRepeat: 'no-repeat',
    ...getCardFaceBackgroundStyle(card.images.layout, side),
  })

  const revealActions = () => {
    if (!isDragging && !isRemoving) setShowActions(!showActions)
  }

  const removeCard = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsRemoving(true)
    removeTimerRef.current = window.setTimeout(() => {
      onRemove(comparisonKey)
      removeTimerRef.current = null
    }, COMPARISON_EXIT_DURATION)
  }

  useEffect(() => () => {
    if (removeTimerRef.current) window.clearTimeout(removeTimerRef.current)
  }, [])

  useEffect(() => {
    let disposed = false
    let prepareFrame = 0
    let transitionFrame = 0
    const image = new Image()
    setLoadState('loading')
    setFaceLayoutReady(false)
    setFaceTransitionReady(false)
    image.onload = () => {
      if (disposed) return
      setLoadState('ready')
      // 先只绘制当前面；下一帧在其下建立 3D 卡，再下一帧移除覆盖层。
      prepareFrame = requestAnimationFrame(() => {
        setFaceLayoutReady(true)
        transitionFrame = requestAnimationFrame(() => setFaceTransitionReady(true))
      })
    }
    image.onerror = () => {
      if (!disposed) setLoadState('error')
    }
    image.src = imageSource
    return () => {
      disposed = true
      cancelAnimationFrame(prepareFrame)
      cancelAnimationFrame(transitionFrame)
    }
  }, [imageSource])

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 10 : undefined,
      }}
      className={`relative min-w-0 cursor-grab select-none [touch-action:pan-y] active:cursor-grabbing ${isDragging ? 'opacity-55' : 'opacity-100'}`}
      {...attributes}
      {...listeners}
      onClick={revealActions}
      role="listitem"
      aria-label={t('compare.cardAria', { name: cardLabel })}
    >
      <div className={`comparison-card-scene relative mx-auto w-full max-w-[300px] transition-[opacity,transform,filter] duration-200 ease-out ${isRemoving ? 'translate-y-3 scale-95 opacity-0 blur-[1px]' : 'translate-y-0 scale-100 opacity-100'}`}>
        {faceLayoutReady && (
          <div className={`comparison-card-inner opacity-100 ${face === 'back' ? 'is-back' : ''} ${faceTransitionReady ? 'is-face-transition-ready' : ''}`}>
            <div className="comparison-card-face" style={imageStyle('front')} aria-label={t('compare.cardFrontAria', { name: cardLabel })} />
            <div className="comparison-card-face comparison-card-back" style={imageStyle('back')} aria-label={t('compare.cardBackAria', { name: cardLabel })} />
          </div>
        )}
        {!faceTransitionReady && (
          <div
            className={`comparison-card-face comparison-card-static-face transition-opacity duration-300 ${loadState === 'ready' ? 'opacity-100' : 'opacity-0'}`}
            style={imageStyle(face)}
            aria-label={t(face === 'back' ? 'compare.cardBackAria' : 'compare.cardFrontAria', { name: cardLabel })}
          />
        )}
        <ImageLoadOverlay
          loadState={loadState}
          isAutoRetrying={isAutoRetrying}
          onRetry={retryLoad}
          loadingLabel={t('compare.cardLoading', { name: cardLabel })}
          retryingLabel={t('compare.cardRetrying', { name: cardLabel })}
          overlayClassName="pointer-events-none absolute inset-0 z-10 grid place-items-center rounded-[5.5%] border border-[#d8f5ec1f] bg-[#08161c]"
          loadingIndicatorProps={{ size: 'sm', glow: true, showLabel: false }}
          retryingIndicatorProps={{ size: 'sm', glow: true, showLabel: false }}
          errorClassName="rounded-[5.5%] border border-[#00e5a055]"
        />
        {showActions && (
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onClick={removeCard}
            disabled={isRemoving}
            className={`absolute right-2 top-2 z-20 rounded-full border border-[#7fdcf2aa] bg-[#150c0bea] px-3 py-1.5 text-[10px] tracking-[.12em] text-[#a8e8f7] shadow-[0_8px_24px_#0009] backdrop-blur transition-all duration-150 hover:border-[#a8e8f7] hover:bg-[#2a1210] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7fdcf280] ${isRemoving ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}
            aria-label={t('compare.cardRemove', { name: cardLabel })}
          >
            {t('compare.delete')}
          </button>
        )}
      </div>
    </article>
  )
}
