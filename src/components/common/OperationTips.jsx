import { useI18n } from '../../i18n'

export default function OperationTips({ items, className = '' }) {
  const { t } = useI18n()
  return (
    <div className={`border-t border-[#173430] pt-5 ${className}`}>
      <span className="mb-3 block text-[9px] tracking-[.3em] text-[#5f8d84]">{t('tips.heading')}</span>
      <ul className="m-0 space-y-2.5 p-0 text-xs leading-6 text-[#8e938b]">
        {items.map(([label, description]) => (
          <li key={label} className="flex list-none gap-2">
            <b className="shrink-0 font-medium text-[#2ab8e0]">{label}</b>
            <span>{description}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
