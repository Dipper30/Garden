import i18n from '../i18n'

export const switchLanguage = () => {
  const currentLang = i18n.global.locale
  i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
  localStorage.setItem('locale', i18n.global.locale)
}
