/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  Equals,
  JoinTableWithAlias,
} from '../../src/index'

import {
  DbDict,
  User,
  UserDetail,
} from './data'
import {
  DbDict as DbDict2,
  User as User2,
  UserDetail as UserDetail2,
} from './data2'

// eslint-disable-next-line import/order
import assert = require('power-assert')


type AcUser = DbDict['aliasColumns']['tb_user']
type AcUserDetail = DbDict['aliasColumns']['tb_user_detail']

type AcUser2 = DbDict2['aliasColumns']['tb_user']
type AcUserDetail2 = DbDict2['aliasColumns']['tb_user_detail']

const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTableWithAlias works', () => {
    it('dup key: uid', () => {
      type Foo = JoinTableWithAlias<User, AcUser, UserDetail, AcUserDetail>
      interface Expect {
        name: string
        ctime: string | Date
        age: number
        address: string
        tbUserUid: number
        tbUserDetailUid: number
      }
      const ret1: Equals<Foo, Expect> = true
    })
    it('dup key: uid and name', () => {
      type Foo = JoinTableWithAlias<User2, AcUser2, UserDetail2, AcUserDetail2>
      interface Expect {
        ctime: string | Date
        age: number
        address: string
        tbUserUid: number
        tbUserDetailUid: number
        tbUserName: string
        tbUserDetailName: string
      }
      const ret1: Equals<Foo, Expect> = true
    })
  })
})

