/* eslint-disable @typescript-eslint/no-explicit-any */

import { OverwriteNeverToUnknown } from './common'


/**
 * Database's tables definition (extends DbModel)
 * @example ```ts
 * interface Db extends DbModel {
 *  tb_user: User
 *  tb_user_detail: UserDeatil
 * }
 * ```
 */
export interface DbModel<FieldType = any> {
  [tb: string]: TableModel<FieldType>
}

/**
 * Table's (partial) fields definition
 * @example ```ts
 * interface User extends TableModel {
 *  uid: number
 *  name: string
 * }
 * ```
 */
export interface TableModel<FieldType = any> {
  [outputField: string]: FieldType
}

/**
 * Join two table, never type will be converted to unknown
 */
export type JoinTable<
  L extends TableModel,
  R extends TableModel,
  KeyExcludeOptional extends keyof L | keyof R | void = void>
  = Omit<OverwriteNeverToUnknown<L & R>, KeyExcludeOptional extends void ? never : KeyExcludeOptional>

/**
 * Join two table, duplicated field removed
 */
export type JoinTableUnique<
  L extends TableModel,
  R extends TableModel,
  KeyExcludeOptional extends keyof L | keyof R | void = void>
  = JoinTable<L, R, KeyExcludeOptional | (keyof L & keyof R)>

