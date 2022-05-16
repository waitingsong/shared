import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'


export const appDir = process.cwd()

export function fileShortPath(importUrl: string): string {
  const path = relative(appDir, genCurrentFilename(importUrl)).replace(/\\/ug, '/')
  return path
}

/**
 * generate __filename for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentFilename(inputUrl: string): string {
  return fileURLToPath(inputUrl).replace(/\\/ug, '/')
}
/**
 * generate __dirname for ESM
 * @param inputUrl import.meta.url
 */
export function genCurrentDirname(inputUrl: string): string {
  const __filename = genCurrentFilename(inputUrl)
  const dir = join(__filename, '..').replace(/\\/ug, '/')
  return dir
}

/** Set loading path for node-ffi linking dll */
export function setPathDirectory(path: string): void {
  if (path && typeof path === 'string') {
    const ori = process.env.PATH ? process.env.PATH : ''
    process.env.PATH = `${ori};${path}`
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
export function nFormatter(positiveNum: number, digits = 2, sep = ''): string {
  if (positiveNum <= 0) {
    return positiveNum.toString()
  }
  const item = lookup.slice().reverse().find((row) => {
    return positiveNum >= row.value
  })
  if (! item) {
    return positiveNum.toString()
  }

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/u
  const ret = (positiveNum / item.value).toFixed(digits).replace(rx, '$1') + sep + item.symbol
  return ret
}
