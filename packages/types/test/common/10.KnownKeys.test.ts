/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { Equals, KnownKeys } from '../../src/index'

import {
  Alias,
  AliasRecord,
  AliasRecord2,
  alias,
  alias2,
} from './test-model'


const filename = basename(__filename)

interface User1 {
  uid: bigint
  age: number
  gender: number
  name: string
  ctime: Date
  mtime: Date | null
}
interface User2 extends User1 {
  addr: unknown
}
interface User3 extends User2 {
  json: any
}
interface User4 extends User2 {
  neverKey: never
}

class CUser1 {

  uid: bigint

  age: number

  gender: number

  name: string

  ctime: Date

  mtime: Date | null

}
class CUser2 extends CUser1 {

  addr: unknown

}
class CUser3 extends CUser2 {

  json: any

}

describe(filename, () => {
  describe('should KnownKeys works for class', () => {
    it('type bigint', () => {
      type T1 = KnownKeys<CUser1>
      type Expect = 'uid' | 'age' | 'gender' | 'name' | 'ctime' | 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KnownKeys<CUser2>
      type Expect2 = Expect | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KnownKeys<CUser3>
      type Expect3 = Expect2 | 'json'
      const t3: Equals<T3, Expect3> = true
    })
  })


  describe('should KnownKeys works for interface', () => {
    it('type bigint', () => {
      type T1 = KnownKeys<User1>
      type Expect = 'uid' | 'age' | 'gender' | 'name' | 'ctime' | 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KnownKeys<User2>
      type Expect2 = Expect | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KnownKeys<User3>
      type Expect3 = Expect2 | 'json'
      const t3: Equals<T3, Expect3> = true
    })
  })

})

