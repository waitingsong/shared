import { dirname, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'


export const appDir = process.cwd()

export function fileShortPath(importUrl: string, separator = '/'): string {
  let path = relative(appDir, genCurrentFilename(importUrl))
  if (separator && separator !== sep) {
    path = path.replaceAll(sep, separator)
  }
  return path
}

/**
 * Generate __filename for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentFilename(inputUrl: string, separator = '/'): string {
  let path = fileURLToPath(inputUrl)
  if (separator && separator !== sep) {
    path = path.replaceAll(sep, separator)
  }
  return path
}
/**
 * Generate __dirname for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentDirname(inputUrl: string, separator = '/'): string {
  const __filename = genCurrentFilename(inputUrl, sep)
  let dir = dirname(__filename)
  if (separator && separator !== sep) {
    dir = dir.replaceAll(sep, separator)
  }
  return dir
}

/** Set loading path for node-ffi linking dll */
export function setPathDirectory(path: string): void {
  if (path && typeof path === 'string') {
    const ori = process.env['PATH'] ? process.env['PATH'] : ''
    process.env['PATH'] = `${ori};${path}`
  }
}


interface Formater {
  value: number
  symbol: string
}
const lookup: Formater[] = [
  { value: 1, symbol: '' },
  { value: 1e3, symbol: 'k' },
  { value: 1e6, symbol: 'M' },
  { value: 1e9, symbol: 'G' },
  { value: 1e12, symbol: 'T' },
  { value: 1e15, symbol: 'P' },
  { value: 1e18, symbol: 'E' },
]
/**
 *
 * @link https://stackoverflow.com/a/9462382
 */
export function nFormatter(positiveNum: number, digits = 2, separator = ''): string {
  if (positiveNum <= 0) {
    return positiveNum.toString()
  }
  const item = lookup.slice().reverse()
    .find((row) => {
      return positiveNum >= row.value
    })
  if (! item) {
    return positiveNum.toString()
  }

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/u
  const ret = (positiveNum / item.value).toFixed(digits).replace(rx, '$1') + separator + item.symbol
  return ret
}
