/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  Equals,
  PickDuplicateKeys,
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


type AcUser = DbDict['aliasColumns']['tb_user']

const filename = basename(__filename)

describe(filename, () => {

  describe('should PickDuplicateKeys works', () => {
    it('normal 1', () => {
      type F1 = PickDuplicateKeys<User, AcUser>
      type Expect = 'name' | 'uid' | 'ctime'
      const ret1: Equals<F1, Expect> = true
      const ret2: Equals<F1, 'uid'> = false
    })
    it('normal 2', () => {
      type F1 = PickDuplicateKeys<User, User>
      type Expect = 'name' | 'uid' | 'ctime'
      const ret1: Equals<F1, Expect> = true
      const ret2: Equals<F1, 'uid'> = false
    })
    it('normal 3', () => {
      type F1 = PickDuplicateKeys<User, UserDetail>
      type Expect = 'uid'
      const ret1: Equals<F1, Expect> = true
      const ret2: Equals<F1, 'uid' | 'name'> = false
    })
  })

})

