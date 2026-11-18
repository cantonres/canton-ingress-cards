import { useI18n } from '../../i18n'

export default function ImageLoadError({ message, onRetry, className = '' }) {
  const { t } = useI18n()
  return (
    <div className={`absolute inset-0 z-10 grid place-items-center bg-[#08161c] ${className}`} role="alert">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs tracking-[.12em] text-[#00e5a0]">{message ?? t('error.image')}</span>
        <button
          type="button"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={(event) => {
            event.stopPropagation()
            onRetry()
          }}
          className="rounded-full border border-[#00e5a080] bg-[#00e5a00d] px-4 py-2 text-[10px] tracking-[.14em] text-[#7fdcf2] transition-colors hover:border-[#7fdcf2] hover:bg-[#00e5a01f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a066]"
        >
          <span className="mr-1.5 font-sans" aria-hidden="true">↻</span>
          {t('error.retry')}
        </button>
      </div>
    </div>
  )
}
