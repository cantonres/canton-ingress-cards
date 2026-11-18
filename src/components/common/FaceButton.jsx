// sm 适配单卡底部紧凑工具栏，md 供空间更充足的对比区使用。
const sizes = {
  sm: {
    button: 'shrink-0 whitespace-nowrap max-sm:gap-1 max-sm:tracking-[.1em] mobile-device:gap-1 mobile-device:tracking-[.1em]',
    mark: 'h-7 w-7',
  },
  md: {
    button: 'transition-colors',
    mark: 'h-8 w-8 transition-colors',
  },
}

export default function FaceButton({ label, mark, active, onClick, size = 'sm' }) {
  const style = sizes[size] ?? sizes.sm

  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`flex items-center gap-2 border-0 bg-transparent font-serif text-xs tracking-[.2em] ${style.button} ${active ? 'text-[#cdeee4]' : 'text-[#6e756d] hover:text-[#8fb6ae]'}`}
    >
      <span className={`grid shrink-0 place-items-center rounded-full border text-[11px] ${style.mark} ${active ? 'border-[#2ab8e0] text-[#2ab8e0]' : 'border-[#1c3d3a]'}`}>{mark}</span>
      <span>{label}</span>
    </button>
  )
}
