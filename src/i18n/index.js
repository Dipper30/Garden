import { createI18n } from 'vue-i18n/dist/vue-i18n.esm-bundler.js'
import locales from './locales'
// import store from '../store'

const i18n = createI18n({
  locale: localStorage.getItem('locale') || 'zh_cn',
  messages: locales
})

export default i18n
