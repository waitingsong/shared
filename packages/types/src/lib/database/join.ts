import { FormatIntersect } from '../common'
import { UnionToIntersection } from '../union2tuple'

import {
  AliasColumn,
  FlateJointTable,
  JoinTableDistinct,
  PickDuplicateKeys,
  TableAliasCols,
  TableModel,
  TableModelFromDictAlias,
} from './common'


/**
 * Join two tables model, duplicate keys replaced by elements of AliasCols
 *
 * @param L Left table, User
 * @param AL AliasCols of left table, AcUser
 * @param R Right table, UserDetail
 * @param AR AliasCols of right table, AcUserDetail
 * @example `type F1 = JoinTableWithAlias<User, AcUser, UserDetail, AcUserDetail>`
 * @returns ```ts
 * // Assume User and UserDetail both have fields uid and name
 * {
 *  ctime: string | Date;
 *  age: number;
 *  address: string;
 *  tbUserUid: number;
 *  tbUserDetailUid: number;
 *  tbUserName: string;
 *  tbUserDetailName: string;
 * }
 * ```
 */
export type JoinTableWithAlias<
  L extends TableModel,
  AL extends TableAliasCols<L>,
  R extends TableModel,
  AR extends TableAliasCols<R>,
> = FormatIntersect<JoinTableDistinct<L, R> & A4<L, AL, R, AR>>


// type AcUser = DbDict['aliasColumns']['tb_user']
// type AcUserDetail = DbDict['aliasColumns']['tb_user_detail']
// type Ret = JoinTableWithAlias<User, AcUser, UserDetail, AcUserDetail>
// type F5k = PickDuplicateKeys<[keyof User, keyof UserDetail]> // 'uid' | 'name'
// type RA4 = A4<User, AcUser, UserDetail, AcUserDetail>
// type RA3 = A3<User, AcUser, UserDetail, AcUserDetail>
// type RA2 = PickDictColsByDupKeysFromTablesModel<User, AcUser, UserDetail, AcUserDetail>
// type RA1 = A1<AcUser, AcUserDetail, F5k>
// type F6 = PickAliasColsByKey< AcUser, AcUserDetail, F5k>

type A4<
  L extends TableModel,
  AL extends TableAliasCols<L>,
  R extends TableModel,
  AR extends TableAliasCols<R>,
> = GenTableModelByAliasCols<PickDictColsByDupKeysFromTablesModel<L, AL, R, AR>, A3<L, AL, R, AR>>

type A3<
  L extends TableModel,
  AL extends TableAliasCols<L>,
  R extends TableModel,
  AR extends TableAliasCols<R>,
> = TableModelFromDictAlias<L, AL> & TableModelFromDictAlias<R, AR>


export type PickDictColsByDupKeysFromTablesModel<
  L extends TableModel,
  AL extends TableAliasCols,
  R extends TableModel,
  AR extends TableAliasCols,
> = UnionToIntersection<FlateJointTable<A1<AL, AR, PickDuplicateKeys<[keyof L, keyof R]>>>>

type A1<
  AL extends TableAliasCols,
  AR extends TableAliasCols,
  Keys,
> = PickAliasColsByKey<AL, AR, Keys>

/**
 * @param ACols ```ts
 * {
 *  tbUserUid: "tb_user.uid"
 *  tbUserDetailUid: "tb_user_detail.uid"
 * }
 * ```
 * @param T ```ts
 * {
 *  tbUserUid: number
 *  tbUserName: string
 *  tbUserCtime: string | Date
 *  tbUserDetailUid: number
 *  tbUserDetailAge: number
 *  tbUserDetailAddress: string
 * }
 * ```
 * @returns ```ts
 * {
 *  tbUserUid: number
 *  tbUserDetailUid: number
 * }
 * ```
 */
type GenTableModelByAliasCols<
  ACols extends AliasColumn | unknown,
  T extends TableModel,
> = ACols extends AliasColumn
  ? { [K in keyof ACols]: K extends keyof T ? T[K] : never }
  : never

/**
 *
 * @param AC1 ```ts
 * {
 *  uid: { tbUserUid: "tb_user.uid" }
 *  name: { tbUserName: "tb_user.name" }
 *  ctime: { tbUserCtime: "tb_user.ctime" }
 * ```
 * @param AC2 ```ts
 * {
 *  uid: { tbUserDetailUid: "tb_user_detail.uid" }
 *  age: { tbUserDetailAge: "tb_user_detail.age" }
 *  address: { tbUserDetailAddress: "tb_user_detail.address" }
 * }
 * ```
 * @param Keys `"uid"`
 * @returns ```ts
 * {
 *  uid: {
 *    tbUserUid: "tb_user.uid"
 *    tbUserDetailUid: "tb_user_detail.uid"
 *  },
 *  name: {...}
 * }
 * ```
 */
type PickAliasColsByKey<
  A1 extends TableAliasCols,
  A2 extends TableAliasCols,
  Keys,
> = Keys extends keyof A1 & keyof A2
  // ? UnionToIntersection<_PickAliasColsByKey<AC1, AC2, Keys>> //  UnionToIntersection does NOT work
  ? _PickAliasColsByKey<A1, A2, Keys>
  : never

type _PickAliasColsByKey<
  A1 extends TableAliasCols,
  A2 extends TableAliasCols,
  Keys,
> = Keys extends keyof A1 & keyof A2
  ? { [K in Keys]: FormatIntersect<A1[K] & A2[K]> }
  : never

