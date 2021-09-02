import i18n from '../i18n'
import moment from 'moment'

export const switchLanguage = () => {
  const currentLang = i18n.global.locale
  i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
  localStorage.setItem('locale', i18n.global.locale)
}

export const calcTimeDifference = (timeEnd, timeBegin) => {
  if (!timeBegin) timeBegin = moment().unix()
  timeEnd = timeEnd < timeBegin ? 1000 * timeBegin : 1000 * timeEnd
  timeBegin = timeEnd < timeBegin ? 1000 * timeEnd : 1000 * timeBegin
  if (typeof timeEnd !== 'number' || typeof timeBegin !== 'number') return null
  const days = moment(timeEnd).diff(moment(timeBegin), 'days')
  const hours = moment(timeEnd - days * 24 * 60 * 60 * 1000).diff(moment(timeBegin), 'hours')
  const minutes = moment(timeEnd - days * 24 * 60 * 60 * 1000 - hours * 3600 * 1000).diff(moment(timeBegin), 'minutes')
  const seconds = moment(timeEnd - days * 24 * 60 * 60 * 1000 - hours * 3600 * 1000 - minutes * 60 * 1000).diff(moment(timeBegin), 'seconds')
  return {
    days,
    hours,
    minutes,
    seconds
  }
}
