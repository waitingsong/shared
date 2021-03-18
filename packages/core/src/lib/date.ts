import { ISO8601String } from '@waiting/shared-types'


/**
 * Generate ISO 8601 string with timezone offset,
 * like '2021-03-17T19:47:28.123+08:00'
 *
 * @link https://stackoverflow.com/a/17415677
 */
export function genISOString(date?: Date): ISO8601String {
  const dd = date ? date : new Date()
  const tzo = -dd.getTimezoneOffset()
  const dif = tzo >= 0 ? '+' : '-'

  const ret = dd.getFullYear().toString()
    + '-' + pad(dd.getMonth() + 1, 2)
    + '-' + pad(dd.getDate(), 2)
    + 'T' + pad(dd.getHours(), 2)
    + ':' + pad(dd.getMinutes(), 2)
    + ':' + pad(dd.getSeconds(), 2)
    + '.' + pad(dd.getMilliseconds(), 3)
    + dif + pad(tzo / 60, 2)
    + ':' + pad(tzo % 60, 2)

  return ret as ISO8601String
}

function pad(num: number, length: number): string {
  const norm = Math.floor(Math.abs(num))
  return norm.toString().padStart(length, '0')
}

