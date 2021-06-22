/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { SnakeToCamel, SnakeToPascal } from '@waiting/shared-types'


/**
 * Convert snake to camelcase
 *
 * @example
 * - 'tb_user_detail' to 'tbUserDetail'
 * - 'tb_user-detail' to 'tbUserDetail'
 * - 'tb_user_2_good' to 'tbUser2Good'
 * - 'tb_user_2good' to 'tbUser2good'
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
 * Convert snake to pascal case
 * @example
 * - 'tb_user_detail' to 'TbUserDetail'
 * - 'tb_user-detail' to 'TbUserDetail'
 * - 'tb_user_2_good' to 'TbUser2Good'
 * - 'tb_user_2good' to 'TbUser2good'
 * @see SnakeToPascal of @waiting/shared-types
 */
export function snakeToPascal<T extends string = string>(input: T): SnakeToPascal<T> {
  const line = snakeToCamel(input)
  const p1 = line.slice(0, 1).toUpperCase()
  const p2 = line.slice(1)
  return `${p1}${p2}` as SnakeToPascal<T>
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
export function camelToSnakeCase<T extends string = string, Target extends string = string>(input: T): Target {
  return input.replace(/[A-Z]/ug, match => `_${match.toLowerCase()}`)
    .replace(/(?<=\w)\d+/ug, match => `_${match}`) as Target
}

