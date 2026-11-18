import { useI18n } from '../../i18n'

export default function SiteFooter() {
  const { t } = useI18n()
  return (
    <footer className="flex min-h-16 flex-col items-center justify-center gap-2 border-t border-[#d8f5ec1a] py-3 text-center font-mono text-[8px] tracking-[.25em] text-[#4f554f]">
      <p className="m-0">{t('footer.text')}</p>
      <a
        href="https://cantonres.com"
        target="_blank"
        rel="noreferrer"
        title="Canton Resistance · cantonres.com"
        aria-label="Canton Resistance · cantonres.com"
        className="inline-block opacity-80 transition-opacity hover:opacity-100"
      >
        <img
          src={`${import.meta.env.BASE_URL}guangzhou-resistance.png`}
          alt="Canton Resistance"
          className="h-7 w-auto"
        />
      </a>
    </footer>
  )
}
