/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  JoinTableExclude,
  Equals,
} from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTableExclude works for interface', () => {
    it('normal', () => {
      type Foo = JoinTableExclude<User, Order>
      interface ExpectType {
        address: string
        uid: unknown
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableExclude<User, Order, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableExclude<User, Order2>
      interface ExpectType {
        address: string
        uid: unknown
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableExclude<User, Order>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableExclude<User, Order2>
      interface ExpectType {
        address: string
        uid: any
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
  })

  describe('should JoinTableExclude works for class', () => {
    it('normal', () => {
      type Foo = JoinTableExclude<CUser, COrder>
      interface ExpectType {
        address: string
        uid: unknown
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableExclude<CUser, COrder, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableExclude<CUser, COrder2>
      interface ExpectType {
        address: string
        uid: unknown
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableExclude<CUser, COrder>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableExclude<CUser, COrder2>
      interface ExpectType {
        address: string
        uid: any
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
  })
})

interface User {
  uid: number
  name: string
}
interface Order {
  uid: number
  address: string
}
interface Order2 {
  uid: bigint
  address: string
}

class CUser {

  uid: number

  name: string

}
class COrder {

  uid: number

  address: string

}
class COrder2 {

  uid: bigint

  address: string

}

