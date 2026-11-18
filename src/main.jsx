import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { I18nProvider } from './i18n'
import './index.css'
import { isMobileDevice } from './utils/device'

// Tailwind 的响应式断点无法识别 UC 桌面模式等触摸设备，启动时补充设备能力类。
if (isMobileDevice()) {
  document.documentElement.classList.add('mobile-device')
}

const updateDocumentTitle = (lang) => {
  document.title = lang === 'en'
    ? 'Canton Cards · Ingress collectible card archive'
    : 'Canton 卡册 · Ingress 收藏卡存档'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nProvider onChange={updateDocumentTitle}>
      <App />
    </I18nProvider>
  </StrictMode>,
)
