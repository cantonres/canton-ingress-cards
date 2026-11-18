import { lazy, useEffect } from 'react'
import DeferredSection from './components/common/DeferredSection'
import LoadingIndicator from './components/common/LoadingIndicator'
import SiteFooter from './components/layout/SiteFooter'
import SiteHeader from './components/layout/SiteHeader'
import ViewerSection from './components/viewer/ViewerSection'
import { collections } from './data/collections'
import { useI18n } from './i18n'

// 对比区只有接近视口时才加载，避免首屏同时初始化拖拽逻辑和多张卡图。
const ComparisonSection = lazy(() => import('./components/comparison/ComparisonSection'))

export default function App() {
  useEffect(() => {
    const loadingScreen = document.getElementById('app-loading')
    const frame = requestAnimationFrame(() => loadingScreen?.remove())
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden text-[#d8f5ec]">
      <div className="ingress-bg" aria-hidden="true" />
      <div className="grain pointer-events-none fixed inset-0 z-50 opacity-[.06]" aria-hidden="true" />
      <div className="relative z-10">
      <SiteHeader />
      <ViewerSection collections={collections} />

      {/* 预留高度保证页面在组件尚未加载时仍可滚动到观察区域；否则 1px 哨兵会因负 rootMargin 永远无法触发。 */}
      <DeferredSection
        id="comparison"
        rootMargin="0px 0px -80px 0px"
        className="min-h-[420px] scroll-mt-6"
        fallback={<ComparisonSectionFallback />}
      >
        <ComparisonSection collections={collections} />
      </DeferredSection>

      <SiteFooter />
      </div>
    </div>
  )
}

function ComparisonSectionFallback() {
  const { t } = useI18n()
  return (
    <section className="grid min-h-[420px] place-items-center border-t border-[#d8f5ec1f]">
      <LoadingIndicator label={t('app.compareLoading')} size="md" labelClassName="text-[10px] tracking-[.25em]" />
    </section>
  )
}
