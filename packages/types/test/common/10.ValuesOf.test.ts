/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { Equals, ValuesOf } from '../../src/index'

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
  describe('should ValuesOf work for class', () => {
    it('normal', () => {
      type T1 = ValuesOf<CUser1>
      type Expect = string | bigint | number | Date | null
      const t1: Equals<T1, Expect> = true

      type T2 = ValuesOf<CUser2>
      type Expect2 = unknown
      const t2: Equals<T2, Expect2> = true

      type T3 = ValuesOf<CUser3>
      type Expect3 = any
      const t3: Equals<T3, Expect3> = true
    })
  })


  describe('should ValuesOf work for interface', () => {
    it('normal', () => {
      type T1 = ValuesOf<User1>
      type Expect = string | bigint | number | Date | null
      const t1: Equals<T1, Expect> = true

      type T2 = ValuesOf<User2>
      type Expect2 = unknown
      const t2: Equals<T2, Expect2> = true

      type T3 = ValuesOf<User3>
      type Expect3 = any
      const t3: Equals<T3, Expect3> = true
    })
  })

})

