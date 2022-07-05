import assert from 'node:assert'

import {
  CamelKeys,
  CamelToSnake,
  SnakeKeys,
  SnakeToCamel,
  SnakeToPascal,
} from '@waiting/shared-types'


const startDelimiterRegExpMap = new Map<string, RegExp>()
const endDelimiterRegExpMap = new Map<string, RegExp>()
const regExpMap = new Map<string, RegExp>()
const startDelimiterRegExpMapPascal = new Map<string, RegExp>()

/**
 * Convert snake to camelcase
 *
 * @example
 * - 'tb_user_detail' to 'tbUserDetail'
 * - 'tb_user_2_good' to 'tbUser2Good'
 * - 'tb_user_2good' to 'tbUser2good'
 * - '_tb_user' to '_tbUser'
 * - '__tb__user' to '__tb_User'
 * - '__tb_user__' to '__tbUser__'
 * - 'tb-user-detail' to 'tbUserDetail' with 2nd param `-`
 * @see SnakeToCamel of @waiting/shared-types
 */
export function snakeToCamel<
  T extends string,
  D extends string = '_',
  TrimStart extends boolean = false,
  TrimEnd extends boolean = false,
>(
  input: T,
  /** @default _ */
  delimiter?: D,
  /** @defalut false */
  trimStartFlag?: TrimStart,
  /** @defalut false */
  trimEndFlag?: TrimEnd,
): SnakeToCamel<T, D, TrimStart, TrimEnd> {

  const dem = delimiter ?? '_'
  const ts = trimStartFlag ?? false
  const te = trimEndFlag ?? false

  let reg = regExpMap.get(dem)
  if (! reg) {
    reg = new RegExp(`${dem}+[^${dem}]+|[^${dem}]+|${dem}+$`, 'ug')
    regExpMap.set(dem, reg)
    if (regExpMap.size > 10000) {
      regExpMap.clear()
    }
  }

  const matches = input.match(reg)
  const len = matches?.length
  if (! len) {
    return '' as SnakeToCamel<T, D, TrimStart, TrimEnd>
  }

  const arr = matches.map((str, idx) => _snakeToCamel(len, idx, str, dem, ts, te))
  const ret = arr.join('') as SnakeToCamel<T, D, TrimStart, TrimEnd>
  return ret
}

function _snakeToCamel(
  len: number,
  idx: number,
  input: string,
  delimiter: string,
  trimStartFlag: boolean,
  trimEndFlag: boolean,
): string {

  if (! input) { return '' }

  let ret = input

  if (idx === 0) {
    if (trimStartFlag === true) {
      ret = trimStart(input, delimiter)
    }
    return ret
  }
  else if (idx === len - 1) {
    if (trimEndFlag === true && input.endsWith(delimiter)) {
      ret = trimEnd(input, delimiter)
    }
    else if (input.startsWith(delimiter) && input.endsWith(delimiter)) {
      return ret
    }
  }

  if (ret) {
    ret = trimStart(ret, delimiter)
    ret = capitalize(ret)
  }

  return ret
}

export function trimStart(input: string, delimiter: string): string {
  let reg = startDelimiterRegExpMap.get(delimiter)
  if (! reg) {
    reg = new RegExp(`^${delimiter}+`, 'u')
    startDelimiterRegExpMap.set(delimiter, reg)
    if (startDelimiterRegExpMap.size > 10000) {
      startDelimiterRegExpMap.clear()
    }
  }
  return input.replace(reg, '')
}

export function trimEnd(input: string, delimiter: string): string {
  let reg = endDelimiterRegExpMap.get(delimiter)
  if (! reg) {
    reg = new RegExp(`^${delimiter}+$`, 'u')
    endDelimiterRegExpMap.set(delimiter, reg)
    if (endDelimiterRegExpMap.size > 10000) {
      endDelimiterRegExpMap.clear()
    }
  }
  return input.replace(reg, '')
}

function capitalize(input: string): string {
  const first = input.slice(0, 1).toUpperCase()
  return first + input.slice(1)
}



/**
 * Convert snake to pascal case
 * @example
 * - 'tb_user_detail' to 'TbUserDetail'
 * - 'tb_user_2_good' to 'TbUser2Good'
 * - 'tb_user_2good' to 'TbUser2good'
 * - '_tb_user' to '_TbUser'
 * - '__tb__user' to '__Tb_User'
 * - '__tb_user__' to '__TbUser__'
 * - 'tb-user-detail' to 'TbUserDetail' with 2nd param `-`
 * - 'tb_user-detail' to 'TbUserDetail'
 * - 'tb_user_2_good' to 'TbUser2Good'
 * - 'tb_user_2good' to 'TbUser2good'
 * @see SnakeToPascal of @waiting/shared-types
 */
export function snakeToPascal<
  T extends string,
  D extends string = '_',
  TrimStart extends boolean = false,
  TrimEnd extends boolean = false,
>(
  input: T,
  /** @default _ */
  delimiter?: D,
  /** @defalut false */
  trimStartFlag?: TrimStart,
  /** @defalut false */
  trimEndFlag?: TrimEnd,
): SnakeToPascal<T, D, TrimStart, TrimEnd> {

  const dem = delimiter ?? '_'
  const line = snakeToCamel(input, dem, trimStartFlag, trimEndFlag)

  let reg = startDelimiterRegExpMapPascal.get(dem)
  if (! reg) {
    reg = new RegExp(`^${dem}+[^${dem}]`, 'u')
    startDelimiterRegExpMapPascal.set(dem, reg)
    if (startDelimiterRegExpMapPascal.size > 10000) {
      startDelimiterRegExpMapPascal.clear()
    }
  }

  const line2 = line.replace(reg, match => match.toUpperCase())
  const ret = capitalize(line2) as SnakeToPascal<T, D, TrimStart, TrimEnd>
  return ret
}


/**
 * Convert camelcase to snakecase
 *
 * @example
 * - 'tbUserDetail' to 'tb_user_detail'
 * - 'tbUserDetail' to 'tb_user-detail'
 * - `tbUserDetail` to 'tb_user-detail'
 * - `tbUser2Good` to 'tb_user_2_good'
 * - `tbUser2good` to 'tb_user_2good'
 * - `3TbUser2good` to '3_Tb_user_2good'
 * - `3tbUser2good` to '3tb_user_2good'
 */

export function camelToSnake<T extends string, D extends string = '_'>(
  input: T,
  /** @default _ */
  delimiter?: D,
): CamelToSnake<T, D> {

  const dem = delimiter ?? '_'
  let line = input.replace(/^[A-Z]/ug, match => `${match.toLowerCase()}`)
  line = line.replace(/[A-Z]/ug, match => `${dem}${match.toLowerCase()}`)
  const ret = line.replace(/(?<=\w)\d+/ug, match => `${dem}${match}`)
  return ret as CamelToSnake<T, D>
}


export function camelKeys<
  T,
  D extends string = '_',
  Recursive extends boolean = false>(
  input: T,
  /** @default _ */
  delimiter?: D,
  recursive?: Recursive,
): CamelKeys<T, D, Recursive> {

  assert(typeof input === 'object', 'camelKeys: input must be object')

  const ret = {}

  Object.entries(input).forEach(([key, value]) => {
    const key2 = snakeToCamel(key, delimiter)
    if (recursive === true && typeof value === 'object') {
      Object.defineProperty(ret, key2, {
        enumerable: true,
        configurable: true,
        writable: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: camelKeys(value, delimiter, recursive),
      })
    }
    else {
      Object.defineProperty(ret, key2, {
        enumerable: true,
        configurable: true,
        writable: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
      })
    }
  })

  return ret as CamelKeys<T, D, Recursive>
}


export function snakeKeys<
  T,
  D extends string = '_',
  Recursive extends boolean = false>(
  input: T,
  /** @default _ */
  delimiter?: D,
  recursive?: Recursive,
): SnakeKeys<T, D, Recursive> {

  assert(typeof input === 'object', 'snakeKeys: input must be object')

  const ret = {}

  Object.entries(input).forEach(([key, value]) => {
    const key2 = camelToSnake(key, delimiter)
    if (recursive === true && typeof value === 'object') {
      Object.defineProperty(ret, key2, {
        enumerable: true,
        configurable: true,
        writable: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: snakeKeys(value, delimiter, recursive),
      })
    }
    else {
      Object.defineProperty(ret, key2, {
        enumerable: true,
        configurable: true,
        writable: true,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value,
      })
    }
  })

  return ret as SnakeKeys<T, D, Recursive>
}
