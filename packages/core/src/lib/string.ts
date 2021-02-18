/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { SnakeToCamel, SnakeToPascal } from '@waiting/shared-types'


/**
 * Convert 'tb_user-detail' to tbUserDetail
 * @see SnakeToCamel of @waiting/shared-types
 */
export function snakeToCamel<T extends string = string>(input: T): SnakeToCamel<T> {
  const line = input.replace(/-/gu, '_')
  const ret = line.replace(/_./gu, (match) => {
    const str = match.toUpperCase()
    return str.slice(1)
  })
  return ret as SnakeToCamel<T>
}


/**
 * Convert 'tb_user-detail' to TbUserDetail
 * @see SnakeToPascal of @waiting/shared-types
 */
export function snakeToPascal<T extends string = string>(input: T): SnakeToPascal<T> {
  const line = snakeToCamel(input)
  const p1 = line.slice(0, 1).toUpperCase()
  const p2 = line.slice(1)
  return `${p1}${p2}` as SnakeToPascal<T>
}

