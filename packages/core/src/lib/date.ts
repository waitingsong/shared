/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ISO8601String } from '@waiting/shared-types'


/**
 * Generate ISO 8601 string with timezone offset,
 * like '2021-03-17T19:47:28.123+08:00'
 *
 * @link https://stackoverflow.com/a/17415677
 */
export function genISO8601String(date?: Date): ISO8601String {
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


export const defaultDateTimeFormatOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Asia/Shanghai',
}

export const dateTimeFormatterCN = new Intl.DateTimeFormat('zh-CN', defaultDateTimeFormatOptions)
// const date = new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
// dateFormatterCN.format(date) // "2020/12/20 11:23:16"

export function formatDateTime(
  input: number | string | Date,
  locales: string | string[] = 'zh-CN',
  options?: Intl.DateTimeFormatOptions,
): string {

  const dateFormatter = locales && options
    ? new Intl.DateTimeFormat(locales, options)
    : dateTimeFormatterCN

  if (input instanceof Date) {
    return dateFormatter.format(input)
  }
  else if (typeof input === 'number') {
    const val = new Date(input)
    return dateFormatter.format(val)
  }
  else if (typeof input === 'string') {
    const val = new Date(input)
    return dateFormatter.format(val)
  }
  else {
    throw new TypeError('input is invalid')
  }
}

