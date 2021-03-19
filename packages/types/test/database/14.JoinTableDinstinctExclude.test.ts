/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  JoinTableDistinctExclude,
  Equals,
} from '../../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTableDistinctExclude works for interface', () => {
    it('normal', () => {
      type Foo = JoinTableDistinctExclude<User, Order>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableDistinctExclude<User, Order, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableDistinctExclude<User, Order2>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableDistinctExclude<User, Order>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableDistinctExclude<User, Order2>
      interface ExpectType {
        address: string
        uid: any
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
  })

  describe('should JoinTableDistinctExclude works for class', () => {
    it('normal', () => {
      type Foo = JoinTableDistinctExclude<CUser, COrder>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableDistinctExclude<CUser, COrder, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableDistinctExclude<CUser, COrder2>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableDistinctExclude<CUser, COrder>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableDistinctExclude<CUser, COrder2>
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

