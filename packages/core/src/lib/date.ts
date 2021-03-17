
/**
 * Generate ISO 8601 string with timezone offset,
 * like '2021-03-17T19:47:28+08:00'
 *
 * @link https://stackoverflow.com/a/17415677
 */
export function genISOString(date?: Date): string {
  const dd = date ? date : new Date()
  const tzo = -dd.getTimezoneOffset()
  const dif = tzo >= 0 ? '+' : '-'

  const ret = dd.getFullYear().toString()
    + '-' + pad(dd.getMonth() + 1)
    + '-' + pad(dd.getDate())
    + 'T' + pad(dd.getHours())
    + ':' + pad(dd.getMinutes())
    + ':' + pad(dd.getSeconds())
    + '.' + dd.getMilliseconds().toString()
    + dif + pad(tzo / 60)
    + ':' + pad(tzo % 60)
  return ret
}

function pad(num: number) {
  const norm = Math.floor(Math.abs(num))
  return (norm < 10 ? '0' : '') + norm.toString()
}

