import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../../i18n'

const GITHUB_URL = 'https://github.com/cantonres/canton-ingress-cards'
const WATER_CARD_URL = 'https://github.com/pwstrick/water-card'

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" aria-label="GitHub">
      <path
        fill="currentColor"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
      />
    </svg>
  )
}

export default function SiteHeader() {
  const { t, lang, setLang } = useI18n()
  const [aboutOpen, setAboutOpen] = useState(false)
  const popoverRef = useRef(null)
  const aboutButtonRef = useRef(null)

  useEffect(() => {
    if (!aboutOpen) return undefined
    const onPointerDown = (event) => {
      if (popoverRef.current?.contains(event.target) || aboutButtonRef.current?.contains(event.target)) return
      setAboutOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setAboutOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [aboutOpen])

  return (
    <header className="relative z-10 flex h-[88px] items-center justify-between border-b border-[#d8f5ec1f] px-[5vw] max-sm:h-[68px] max-sm:px-5 mobile-device:h-[68px] mobile-device:px-5">
      <a className="flex items-center gap-[13px] text-inherit no-underline" href="#" aria-label={t('top.homeAria')}>
        <span className="grid h-10 w-10 -rotate-3 place-items-center border border-[#00e5a0] text-[21px] font-black text-[#5fd0ee]">卡</span>
        <span>
          <b className="text-lg tracking-[.18em] max-sm:text-[15px] mobile-device:text-[15px]">{t('brand')}</b>
          <small className="mt-[3px] block text-[9px] tracking-[.42em] text-[#6f9a91]">INGRESS CARDS</small>
        </span>
      </a>
      <nav className="legacy-center-x absolute left-1/2 flex gap-12 max-sm:hidden mobile-device:hidden" aria-label={t('top.navAria')}>
        <a className="border-b-2 border-[#2ab8e0] py-[35px] text-[13px] tracking-[.22em] text-[#d8f5ec] no-underline transition-colors" href="#viewer">{t('nav.appreciate')}</a>
        <a className="border-b-2 border-transparent py-[35px] text-[13px] tracking-[.22em] text-[#7aa89f] no-underline transition-colors hover:border-[#2ab8e066] hover:text-[#d8f5ec]" href="#comparison">{t('nav.compare')}</a>
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          title={t('top.langTitle')}
          aria-label={t('top.langTitle')}
          className="rounded border border-[#2ab8e0] px-2.5 py-1.5 font-mono text-[10px] tracking-[.12em] text-[#7fdcf2] transition-colors hover:border-[#2ab8e0] hover:text-[#d8f5ec] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ab8e066]"
        >
          {lang === 'zh' ? 'EN' : '中'}
        </button>
        <a
          className="grid h-8 w-8 place-items-center rounded border border-[#d8f5ec33] text-[#7fdcf2] transition-colors hover:border-[#2ab8e0] hover:text-[#d8f5ec]"
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          title={t('top.githubTitle')}
          aria-label={t('top.githubTitle')}
        >
          <GitHubIcon />
        </a>
        <button
          ref={aboutButtonRef}
          type="button"
          onClick={() => setAboutOpen((value) => !value)}
          title={t('top.disclaimerTitle')}
          aria-label={t('top.disclaimerTitle')}
          aria-expanded={aboutOpen}
          className={`grid h-8 w-8 place-items-center rounded border text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ab8e066] ${aboutOpen ? 'border-[#2ab8e0] text-[#d8f5ec]' : 'border-[#d8f5ec33] text-[#7fdcf2] hover:border-[#2ab8e0] hover:text-[#d8f5ec]'}`}
        >
          ⓘ
        </button>
      </div>

      {aboutOpen && (
        <div
          ref={popoverRef}
          className="absolute right-[5vw] top-[calc(100%+8px)] z-50 max-h-[calc(100vh-120px)] w-[min(380px,calc(100vw-40px))] overflow-y-auto rounded-xl border border-[#2ab8e066] bg-[#0d2028f5] p-5 shadow-[0_20px_50px_#000c] backdrop-blur-md max-sm:right-5 mobile-device:right-5"
          role="dialog"
          aria-label={t('top.aboutHeading')}
        >
          <div className="mb-2 flex items-center justify-between gap-3">
            <b className="text-xs tracking-[.18em] text-[#d8f5ec]">{t('top.aboutHeading')}</b>
            <button
              type="button"
              onClick={() => setAboutOpen(false)}
              title={t('top.close')}
              aria-label={t('top.close')}
              className="grid h-6 w-6 place-items-center rounded border border-[#1a3a34] text-[#8fb6ae] transition-colors hover:border-[#2ab8e0] hover:text-[#d8f5ec]"
            >
              ×
            </button>
          </div>
          <p className="m-0 text-[11px] leading-6 tracking-[.04em] text-[#a8c4bb]">{t('top.disclaimer')}</p>
          <p className="mb-0 mt-2 text-[10px] leading-5 tracking-[.04em] text-[#8fb6ae]">{t('top.rights')}</p>
          <p className="mb-0 mt-2 text-[10px] leading-5 tracking-[.04em] text-[#8fb6ae]">{t('top.takedown')}</p>
          <p className="mb-0 mt-2 text-[10px] leading-5 tracking-[.04em] text-[#6f9a91]">
            {t('top.creditPrefix')}
            <a
              className="text-[#7fdcf2] no-underline underline-offset-2 hover:underline"
              href={WATER_CARD_URL}
              target="_blank"
              rel="noreferrer"
            >
              {t('top.creditLink')}
            </a>
            {t('top.creditSuffix')}
          </p>
          <a
            className="mt-3 inline-flex items-center gap-2 text-[10px] tracking-[.12em] text-[#7fdcf2] no-underline transition-colors hover:text-[#d8f5ec]"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon /> {t('top.aboutGithub')}
          </a>
        </div>
      )}
    </header>
  )
}
