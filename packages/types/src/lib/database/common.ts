/* eslint-disable @typescript-eslint/no-explicit-any */

import { OverwriteNeverToUnknown, FormatIntersect, KnownKeys } from '../common'
import { TupleTail, TupleHead } from '../tuple'
import { UnionToIntersection } from '../union2tuple'


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
 *
 * @example ```ts
 * interface UserAlias {
 *  uid: {
 *    tbUserUid: number
 *    'tb_user.uid': number
 *  }
 *  name: {
 *    tbUserName: string
 *    'tb_user.name': string
 *  }
 * }
 * ```
 */
export interface TableAliasModel {
  [fld: string]: TableModel
}

/**
 * @example ```ts
 * interface {
 *  tb_user: {
 *    uid: {
 *      tbUserUid: "tb_user.uid"
 *    },
 *    name: {
 *      tbUserName: "tb_user.name"
 *    }
 *  }
 * }
 * ```
 */
export type DbAliasCols<D extends DbModel = DbModel, DT = void> = {
  [tb in keyof D]: tb extends keyof DT
    ? TableAliasCols<D[tb], DT[tb]>
    : TableAliasCols<D[tb]>
}


/**
 * @example ```ts
 * {
 *  uid: {
 *   uid: 'tb_user_detail.uid',
 *   tbUserUid: 'tb_user_detail.uid',
 *  },
 *  name: {
 *   name: 'tb_user_detail.name',
 *   tbUserName: 'tb_user.name',
 *  }
 * }
 * ```
 */
export type TableAliasCols<TModel extends TableModel = TableModel, TAC = void> = {
  [fld in keyof TModel]: TAC extends void
    ? AliasColumn
    : fld extends keyof TAC
      ? { [out in keyof TAC[fld]]: TAC[fld][out] }
      : AliasColumn
}

/**
 * Column alias mapping
 * key for output field, value for inupt field
 * @example ```ts
 * {
 *  uid: 'tb_user_detail.uid',
 *  tbUserDetailUid: 'tb_user_detail.uid',
 *  tbUserDetailAge: 'tb_user_detail.age',
 * }
 * ```
 */
export type AliasColumn = Record<string, string>


/**
 * Join two table, duplicate fields will be converted to unknown
 */
export type JoinTable<
  L extends TableModel,
  R extends TableModel>
= Pick<
{
  [K in keyof L]: K extends keyof R
    ? undefined extends R[K]
      ? L[K]
      : unknown
    : L[K]
} & {
  [K in keyof R]: K extends keyof L
    ? undefined extends L[K]
      ? R[K]
      : unknown
    : R[K]
},
KnownKeys<L> | KnownKeys<R>
>

export type JoinTableExclude<
  L extends TableModel,
  R extends TableModel,
  KeyExcludeOptional extends keyof L | keyof R | void = void>
= Omit<
JoinTable<L, R>,
KeyExcludeOptional extends void ? never : KeyExcludeOptional
>

/**
 * Join two table, duplicated fields removed
 */
export type JoinTableDistinct<
  L extends TableModel,
  R extends TableModel>
= Omit<
_JoinTableDistinct<MergeTableDistinct<L, R>>,
KnownKeys<L> & KnownKeys<R>
>
type _JoinTableDistinct<R> = Pick<R, KnownKeys<R>>


/**
 * Dulicate keys will convert to never type
 */
export type MergeTableDistinct<
  L extends TableModel,
  R extends TableModel,
> = {
  [K in keyof L]: K extends keyof R
    ? undefined extends R[K]
      ? L[K]
      : never
    : L[K]
} & {
  [K in keyof R]: K extends keyof L
    ? undefined extends L[K]
      ? R[K]
      : never
    : R[K]
}

// export type PickDuplicateKeys<L extends TableModel, R extends TableModel>
//   = (keyof L & keyof R)

/**
 * @example ```ts
 *   // Expect: "2" | "3"
 *   PickDuplicateKeys<['1' | '2' | '3', '2' | '3' | '4']>
 *
 *   // Expect: () => void
 *   SetIntersection<string | number | (() => void), Function>
 * ```
 */
export type PickDuplicateKeys<T extends unknown[]> = _PickDupKeys<T>
type _PickDupKeys<T1 extends unknown[], T2 = never, Result = never> = {
  2: Result,
  1: T2,
  0: _PickDupKeys<TupleTail<T1>, TupleHead<T1> | T2, Extract<TupleHead<T1>, T2> | Result>,
}[T1 extends [] ? 2 : 0]

/**
 * Generate TableAlias model from TableModel and DictAliasCols,
 * keys from input of AcUser.
 *
 * @example ```ts
 *  type Foo = TableModelFromAlias<User, AcUser>
 * ```
 * @param T - table model ```ts
 *  interface User {
 *   uid: number
 *   name: string
 *  }
 * ```
 * @param TAC - DictType['aliasColumns'][<table>] ```ts
 *  type AcUser = {
 *   uid: { tbUserUid: 'tb_user.uid' },
 *   name: { tbUserName: 'tb_user.name' },
 *  }
 * ```
 * @returns ```ts
 *  type {
 *   tbUserUid: number
 *   tbUserName: string
 *  }
 * ```
 */
export type TableModelFromDictAlias<
  T extends TableModel,
  TAC extends TableAliasCols<T>,
  IncludeKeys extends (keyof T & keyof TAC) | void = void>
  = Readonly<TypeFromJointTable<JointTableFromDictAliasColsKey<T, TAC, IncludeKeys>>>

/**
 * Generate TableAlias model from TableModel and DictAliasCols,
 * keys from output of AcUser.
 *
 * @example ```ts
 *  type Foo = TableModelFromAlias<User, AcUser>
 * ```
 * @param T - table model ```ts
 *  interface User {
 *   uid: number
 *   name: string
 *  }
 * ```
 * @param TAC - DictType['aliasColumns'][<table>] ```ts
 *  type AcUser = {
 *   uid: { tbUserUid: 'tb_user.uid' },
 *   name: { tbUserName: 'tb_user.name' },
 *  }
 * ```
 * @returns ```ts
 *  type {
 *   'tb_user.uid': number
 *   'tb_user.name': string
 *  }
 * ```
 */
export type InverseTableModelFromDictAlias<
  T extends TableModel,
  TAC extends TableAliasCols<T>,
  IncludeKeys extends (keyof T & keyof TAC) | void = void>
  = Readonly<TypeFromJointTable<JointTableFromDictAliasColsValue<T, TAC, IncludeKeys>>>

/**
 * Generate TableAlias model from TableModel and DictAliasCols,
 * keys from both input and output of AcUser.
 *
 * @example ```ts
 *  type Foo = TableModelFromAlias<User, AcUser>
 * ```
 * @param T - table model ```ts
 *  interface User {
 *   uid: number
 *   name: string
 *  }
 * ```
 * @param TAC - DictType['aliasColumns'][<table>] ```ts
 *  type acUser = {
 *   uid: { tbUserUid: 'tb_user.uid' },
 *   name: { tbUserName: 'tb_user.name' },
 *  }
 * ```
 * @returns ```ts
 *  type {
 *   tbUserUid: number
 *   tbUserName: string
 *   tbUserCtime: Date | string
 *   'tb_user.uid': number
 *   'tb_user.name': string
 *   'tb_user.ctime': Date | string
 *  }
 * ```
 */
export type FullTableModelFromDictAlias<
  T extends TableModel,
  TAC extends TableAliasCols<T>,
  IncludeKeys extends (keyof T & keyof TAC) | void = void>
  = Readonly<TypeFromJointTable<JointTableFromDictAliasCols<T, TAC, IncludeKeys>>>


type TypeFromJointTable<T extends TableAliasModel>
  = FormatIntersect<OverwriteNeverToUnknown<UnionToIntersection<FlateJointTable<T>>>>

/**
 * @returns ```ts
 * {
 *  uid: { tbUserUid: number }
 *  name: { tbUserName: string }
 *  ...
 * } & {
 *  uid: { 'tb_user.uid': number }
 *  name: { 'tb_user.name': string }
 * }
 * ```
 */
type JointTableFromDictAliasCols<
  TModel extends TableModel,
  TAliasCols extends TableAliasCols<TModel>,
  IncludeKeys extends (keyof TModel & keyof TAliasCols) | void = void,
> = JointTableFromDictAliasColsKey<TModel, TAliasCols, IncludeKeys>
& JointTableFromDictAliasColsValue<TModel, TAliasCols, IncludeKeys>

/**
 * @returns ```ts
 * {
 *  uid: { tbUserUid: number }
 *  name: { tbUserName: string }
 *  ...
 * }
 * ```
 */
type JointTableFromDictAliasColsKey<
  TModel extends TableModel,
  TAliasCols extends TableAliasCols<TModel>,
  IncludeKeys extends (keyof TModel & keyof TAliasCols) | void = void>
  = IncludeKeys extends string | number
    ? {
      [fld in IncludeKeys]: {
        [output in keyof TAliasCols[fld]]: TModel[fld]
      }
    }
    : {
      [fld in keyof TModel]: {
        [output in keyof TAliasCols[fld]]: TModel[fld]
      }
    }

/**
 * @returns ```ts
 * {
 *  uid: { 'tb_user.uid': number }
 *  name: { 'tb_user.name': string }
 *  ...
 * }
 * ```
 */
type JointTableFromDictAliasColsValue<
  TModel extends TableModel,
  TAliasCols extends TableAliasCols<TModel>,
  IncludeKeys extends (keyof TModel & keyof TAliasCols) | void = void>
  = IncludeKeys extends string | number
    ? {
      [fld in IncludeKeys]: {
        [output in TAliasCols[fld][keyof TAliasCols[fld]]]: TModel[fld]
      }
    }
    : {
      [fld in keyof TModel]: {
        [output in TAliasCols[fld][keyof TAliasCols[fld]]]: TModel[fld]
      }
    }

export type FlateJointTable<T extends TableAliasModel> = T extends { [fld: string]: infer F }
  ? F extends TableModel
    ? { [output in keyof F]: F[output] }
    : never
  : never

