import { useI18n } from '../../i18n'
import FaceButton from '../common/FaceButton'

export default function CardViewerControls({
  isBack,
  isFocusMode,
  interactionMode,
  zoom,
  canZoomOut,
  canZoomIn,
  onFaceChange,
  onZoomChange,
}) {
  const { t, lang } = useI18n()
  const dragLabel = isFocusMode
    ? t('control.dragMode', { mode: t(interactionMode === 'pan' ? 'mode.pan' : 'mode.rotate') })
    : t('control.dragFlip')

  return (
    <div className={`legacy-center-x absolute left-1/2 z-20 flex w-max max-w-[calc(100vw-16px)] items-center justify-center gap-5 whitespace-nowrap max-sm:gap-1.5 mobile-device:gap-1.5 ${isFocusMode ? 'bottom-6' : 'bottom-[-52px] max-sm:bottom-[-45px] mobile-device:bottom-[-45px]'}`}>
      <FaceButton label={t('face.front')} mark={lang === 'en' ? 'F' : '正'} active={!isBack} onClick={() => onFaceChange(0)} />
      <div className="flex shrink-0 items-center gap-3 text-[#a8aa9f]">
        <i className="font-sans text-[22px] not-italic text-[#2ab8e0]">↔</i>
        <span className="text-[11px] leading-tight tracking-[.12em] max-sm:hidden mobile-device:hidden">
          {dragLabel}
          <br />
          <small className="font-mono text-[8px] tracking-[.08em] text-[#4e756d]">{t(isFocusMode ? 'control.switchTip' : 'control.zoomTip')}</small>
        </span>
      </div>
      <FaceButton label={t('face.back')} mark={lang === 'en' ? 'B' : '背'} active={isBack} onClick={() => onFaceChange(180)} />
      <Divider />
      <ZoomButton label={t('control.zoomOut')} mark="−" onClick={() => onZoomChange(-1)} disabled={!canZoomOut} />
      <span className="min-w-9 shrink-0 text-center font-mono text-[9px] text-[#8d938b]" aria-live="polite">{Math.round(zoom * 100)}%</span>
      <ZoomButton label={t('control.zoomIn')} mark="＋" onClick={() => onZoomChange(1)} disabled={!canZoomIn} />
    </div>
  )
}

function Divider() {
  return <span className="h-6 w-px shrink-0 bg-[#1c3d3a]" aria-hidden="true" />
}

function ZoomButton({ label, mark, onClick, disabled }) {
  return (
    <button type="button" className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#4e756d] bg-transparent font-sans text-lg text-[#2ab8e0] transition-colors hover:border-[#2ab8e0] hover:bg-[#2ab8e014] disabled:cursor-not-allowed disabled:opacity-30" aria-label={label} title={label} onClick={onClick} disabled={disabled}>
      {mark}
    </button>
  )
}
