/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { SnakeToCamel, SnakeToPascal } from '@waiting/shared-types'


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
export function snakeToCamel<T extends string = string, D extends string = '_'>(
  input: T,
  // @ts-expect-error
  delimiter: D = '_',
): SnakeToCamel<T, D> {

  if (input.length <= 1) {
    return input as SnakeToCamel<T, D>
  }

  const p1 = input.slice(0, 1)
  if (p1 === delimiter) {
    return delimiter + snakeToCamel(input.slice(1), delimiter) as SnakeToCamel<T, D>
  }
  const re = new RegExp(`${delimiter}+[^${delimiter}]`, 'ug')
  return input.replace(re, match => match.toUpperCase().slice(1)) as SnakeToCamel<T, D>
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
export function snakeToPascal<T extends string = string, D extends string = '_'>(
  input: T,
  // @ts-expect-error
  delimiter: D = '_',
): SnakeToPascal<T, D> {

  const line = snakeToCamel(input, delimiter)

  const re = new RegExp(`^${delimiter}+[^${delimiter}]`, 'u')
  const line2 = line.replace(re, match => match.toUpperCase()) as SnakeToPascal<T, D>
  const p1 = line2.slice(0, 1).toUpperCase()
  const p2 = line2.slice(1)
  return `${p1}${p2}` as SnakeToPascal<T, D>
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

