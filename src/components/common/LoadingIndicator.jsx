// 保留完整 Tailwind 类名，确保构建时能静态扫描并生成对应尺寸样式。
const spinnerSizes = {
  sm: 'h-10 w-10',
  md: 'h-11 w-11',
  lg: 'h-12 w-12',
}

export default function LoadingIndicator({
  label,
  size = 'lg',
  panel = false,
  glow = false,
  showCore = false,
  showLabel = true,
  pulseLabel = false,
  className = '',
  labelClassName = '',
}) {
  return (
    <div
      className={`flex flex-col items-center gap-4 text-[#bfe8dc] ${panel ? 'rounded-2xl border border-[#2ab8e033] bg-[#071018e6] px-7 py-6 shadow-[0_16px_45px_#000b]' : ''} ${className}`}
      role="status"
      aria-label={label}
    >
      <span
        className={`relative block rounded-full border-2 border-[#2ab8e026] border-r-[#7ff7d0] border-t-[#2ab8e0] motion-safe:animate-spin ${spinnerSizes[size] ?? spinnerSizes.lg} ${glow ? 'shadow-[0_0_18px_#2ab8e045]' : ''}`}
        aria-hidden="true"
      >
        {showCore && <i className="absolute inset-[11px] rounded-full bg-[#2ab8e0] shadow-[0_0_10px_#2ab8e0]" />}
      </span>
      {showLabel && (
        <span className={`${pulseLabel ? 'animate-pulse' : ''} ${labelClassName}`}>{label}</span>
      )}
    </div>
  )
}
