/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { Equals, KnownKeys } from '../../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


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
  [k: string]: unknown
}
interface User3 extends User2 {
  json: any
}
interface User4 extends User3 {
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

  addr: unknown;

  [k: string]: unknown

}
class CUser3 extends CUser2 {

  json: any

}
class CUser4 extends CUser3 {

  neverKey: never

}

describe(filename, () => {
  describe('should KnownKeys work for class', () => {
    it('normal', () => {
      type T1 = KnownKeys<CUser1>
      type Expect = 'uid' | 'age' | 'gender' | 'name' | 'ctime' | 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KnownKeys<CUser2>
      type Expect2 = Expect | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KnownKeys<CUser3>
      type Expect3 = Expect2 | 'json'
      const t3: Equals<T3, Expect3> = true

      type T4 = KnownKeys<CUser4>
      type Expect4 = Expect3 | 'neverKey'
      const t4: Equals<T4, Expect4> = true
    })
  })


  describe('should KnownKeys work for interface', () => {
    it('normal', () => {
      type T1 = KnownKeys<User1>
      type Expect = 'uid' | 'age' | 'gender' | 'name' | 'ctime' | 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KnownKeys<User2>
      type Expect2 = Expect | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KnownKeys<User3>
      type Expect3 = Expect2 | 'json'
      const t3: Equals<T3, Expect3> = true

      type T4 = KnownKeys<User4>
      type Expect4 = Expect3 | 'neverKey'
      const t4: Equals<T4, Expect4> = true
    })
  })

})

