import { useI18n } from '../../i18n'

export default function FocusModeToolbar({ interactionMode, onModeChange, onExit }) {
  const { t } = useI18n()
  return (
    <>
      <div className="absolute left-6 top-6 z-30 flex rounded-full border border-[#d8f5ec33] bg-[#0d2028cc] p-1" role="group" aria-label={t('focus.modeAria')}>
        <ModeButton label={t('mode.rotate')} active={interactionMode === 'rotate'} onClick={() => onModeChange('rotate')} />
        <ModeButton label={t('mode.pan')} active={interactionMode === 'pan'} onClick={() => onModeChange('pan')} />
      </div>
      <button
        type="button"
        className="absolute right-6 top-6 z-30 flex items-center gap-2 rounded-full border border-[#d8f5ec33] bg-[#0d2028cc] px-4 py-2 text-[11px] tracking-[.18em] text-[#a9ada5] transition-colors hover:border-[#2ab8e0] hover:text-[#d8f5ec]"
        onClick={onExit}
        aria-label={t('focus.exitLabel')}
      >
        <span className="font-sans text-base">×</span> {t('focus.exit')}
      </button>
    </>
  )
}

function ModeButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[11px] tracking-[.16em] transition-colors ${active ? 'bg-[#2ab8e0] text-[#11150f]' : 'text-[#92988f] hover:text-[#d8f5ec]'}`}
    >
      {label}
    </button>
  )
}
