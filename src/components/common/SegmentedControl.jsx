import { useI18n } from '../../i18n'

// pill 用于主鉴赏区，boxed 用于对比区；组件行为一致，仅视觉语义不同。
const styles = {
  pill: {
    root: 'relative z-20 inline-flex max-w-full overflow-x-auto rounded-full border border-[#d8f5ec1f] bg-[#07101880] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    button: 'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-6 py-2 text-[11px] tracking-[.18em] transition-all max-sm:px-4 max-sm:text-[10px] mobile-device:px-4 mobile-device:text-[10px]',
    active: 'bg-[#2ab8e0] text-[#0a1a22] shadow-[0_5px_18px_#0006]',
    inactive: 'text-[#747b73] hover:text-[#cdeee4]',
  },
  boxed: {
    root: 'inline-flex max-w-full overflow-x-auto rounded-lg border border-[#1c3d3a] bg-[#0d2028] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    button: 'shrink-0 whitespace-nowrap rounded-md px-6 py-2 text-[11px] tracking-[.16em] transition-colors max-sm:px-4 max-sm:text-[10px] mobile-device:px-4 mobile-device:text-[10px]',
    active: 'bg-[#2ab8e0] text-[#0a1a22]',
    inactive: 'text-[#7aa89f] hover:text-[#cdeee4]',
  },
}

export default function SegmentedControl({
  items,
  activeId,
  onChange,
  variant = 'pill',
  ariaLabel,
  className = '',
}) {
  const style = styles[variant] ?? styles.pill
  const { t, lang } = useI18n()

  return (
    <div className={`${style.root} ${className}`} role="tablist" aria-label={ariaLabel ?? t('control.optionSwitch')}>
      {items.map((item) => {
        const active = item.id === activeId
        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(item.id)}
            className={`${style.button} ${active ? style.active : style.inactive}`}
          >
            {lang === 'en' && item.labelEn ? item.labelEn : item.label}
          </button>
        )
      })}
    </div>
  )
}
