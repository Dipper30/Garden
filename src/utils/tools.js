import i18n from '../i18n'
import moment from 'moment'

export const switchLanguage = () => {
  const currentLang = i18n.global.locale
  i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
  localStorage.setItem('locale', i18n.global.locale)
}

/**
 * @param {number} ts // unix timestamp
 * @returns {string}
 */
export const calcDate = (ts) => {
  if (!ts || typeof ts !== 'number') return ''
  return moment(ts * 1000).format('YYYY-MM-DD hh:mm:ss')
}

export const calcTimeDifference = (timeEnd, timeBegin) => {
  if (!timeBegin) timeBegin = moment().unix()
  if (timeEnd < timeBegin) {
    const temp = timeEnd
    timeEnd = timeBegin
    timeBegin = temp
  }
  timeEnd *= 1000
  timeBegin *= 1000
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
