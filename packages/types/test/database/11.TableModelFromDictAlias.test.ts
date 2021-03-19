/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  JoinTable,
  JoinTableDistinct,
  Equals,
  TableModelFromDictAlias,
  InverseTableModelFromDictAlias,
  FullTableModelFromDictAlias,
  // JointTableFromDictAliasCols,
  // JointTableFromDictAliasColsKey,
  // JointTableFromDictAliasColsValue,
  // TypeFromJointTable,
} from '../../src/index'

import {
  DbDict,
  User,
  UserDetail,
  UserAlias,
  UserDetailAlias,
  InverseUserAlias,
  InverseUserDetailAlias,
} from './data'

// eslint-disable-next-line import/order
import assert = require('power-assert')


type AcUser = DbDict['aliasColumns']['tb_user']

// type TA1 = FullTableModelFromDictAlias<User, AcUser>
// declare const foo1: TA1['tbUserUid']
// declare const foo2: TA1['tb_user.uid']
// declare const foo3: TA1['tb_user.ctime']
// type J1 = JointTableFromDictAliasCols<User, AcUser>
// type J1k = JointTableFromDictAliasColsKey<User, AcUser>
// type J1v = JointTableFromDictAliasColsValue<User, AcUser>
// type TF1 = TypeFromJointTable<J1>

const filename = basename(__filename)

describe(filename, () => {

  describe('should TableModelFromDictAlias works', () => {
    it('normal', () => {
      type Foo = TableModelFromDictAlias<User, AcUser>
      const ret: Equals<Foo, Readonly<UserAlias>> = true
    })
    it('includeKey', () => {
      type Foo = TableModelFromDictAlias<User, AcUser, 'uid'>
      const ret: Equals<Foo, Readonly<Pick<UserAlias, 'tbUserUid'>>> = true
    })
    it('includeKeys', () => {
      type Foo = TableModelFromDictAlias<User, AcUser, 'uid' | 'name'>
      const ret: Equals<Foo, Readonly<Pick<UserAlias, 'tbUserName' | 'tbUserUid'> >> = true
    })
  })

  describe('should InverseTableModelFromDictAlias works', () => {
    it('normal', () => {
      type Foo = InverseTableModelFromDictAlias<User, AcUser>
      const ret: Equals<Foo, Readonly<InverseUserAlias>> = true
    })
    it('includeKey', () => {
      type F1 = TableModelFromDictAlias<User, AcUser, 'uid'>
      const ret: Equals<F1, Readonly<Pick<InverseUserAlias, 'tb_user.uid'>>> = false

      type F2 = InverseTableModelFromDictAlias<User, AcUser, 'uid'>
      const ret2: Equals<F2, Readonly<Pick<InverseUserAlias, 'tb_user.uid'>>> = true
    })
    it('includeKeys', () => {
      type F1 = TableModelFromDictAlias<User, AcUser, 'uid' | 'name'>
      const ret: Equals<F1, Readonly<Pick<InverseUserAlias, 'tb_user.uid' | 'tb_user.name'> >> = false

      type F2 = InverseTableModelFromDictAlias<User, AcUser, 'uid' | 'name'>
      const ret2: Equals<F2, Readonly<Pick<InverseUserAlias, 'tb_user.uid' | 'tb_user.name'> >> = true
    })
  })

  describe('should FullTableModelFromDictAlias works', () => {
    it('normal', () => {
      type Foo = FullTableModelFromDictAlias<User, AcUser>
      const ret: Equals<Foo, Readonly<UserAlias & InverseUserAlias>> = true
    })
    it('includeKey', () => {
      type Foo = FullTableModelFromDictAlias<User, AcUser, 'uid'>
      const ret1: Equals<Foo, Readonly<Pick<UserAlias, 'tbUserUid'>>> = false
      const ret2: Equals<Foo, Readonly<Pick<InverseUserAlias, 'tb_user.uid'>>> = false

      type ExpectType = Pick<InverseUserAlias, 'tb_user.uid'> & Pick<UserAlias, 'tbUserUid'>
      const ret3: Equals<Foo, Readonly<ExpectType>> = true
    })
    it('includeKeys', () => {
      type Foo = FullTableModelFromDictAlias<User, AcUser, 'uid' | 'name'>
      const ret1: Equals<Foo, Readonly<Pick<UserAlias, 'tbUserUid' | 'tbUserName'>>> = false
      const ret2: Equals<Foo, Readonly<Pick<InverseUserAlias, 'tb_user.uid' | 'tb_user.name'>>> = false

      type ExpectType = Pick<InverseUserAlias, 'tb_user.uid' | 'tb_user.name'> & Pick<UserAlias, 'tbUserUid' | 'tbUserName'>
      const ret3: Equals<Foo, Readonly<ExpectType>> = true
    })
  })

})

