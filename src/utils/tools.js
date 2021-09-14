import i18n from '../i18n'
import moment from 'moment'

export const switchLanguage = () => {
  const currentLang = i18n.global.locale
  i18n.global.locale = currentLang === 'zh_cn' ? 'en' : 'zh_cn'
  localStorage.setItem('locale', i18n.global.locale)
}

/**
 * @param {number|String} ts // unix timestamp
 * @returns {string}
 */
export const calcDate = (ts) => {
  if (!ts || typeof Number(ts) !== 'number') return ''
  return moment(Number(ts) * 1000).format('YYYY-MM-DD hh:mm:ss')
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

// 获取当前日期零点时的时间戳
/**
 * @param {ts: number|string} 输入当前日期时间戳
 * @returns {ts: number} 返回当前日期的unix秒级时间戳
 */
// 把当前日期变成unix秒级时间戳
export const getDateUnixTS = (ts = 0) => Number(ts) === 0
  ? moment.unix(moment().format('X')).startOf('day').format('X')
  : moment.unix(Number(ts)).startOf('day').format('X')

// 获取当前日期零点时刻的日期
export const getStartOfDate = () => new Date(Number(moment().startOf('day').format('x')))

// 返回当前时间秒级时间戳
export const getCurrentUnixTS = () => Number(moment().format('X'))

// 返回当前时间毫秒级时间戳
export const getCurrentTS = () => Number(moment().format('x'))
