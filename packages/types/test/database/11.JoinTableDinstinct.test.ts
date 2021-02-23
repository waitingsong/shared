/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  JoinTableDistinct,
  Equals,
} from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTableDistinct works for interface', () => {
    it('normal', () => {
      type Foo = JoinTableDistinct<User, Order>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableDistinct<User, Order, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableDistinct<User, Order2>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableDistinct<User, Order>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableDistinct<User, Order2>
      interface ExpectType {
        address: string
        uid: any
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
  })

  describe('should JoinTableDistinct works for class', () => {
    it('normal', () => {
      type Foo = JoinTableDistinct<CUser, COrder>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTableDistinct<CUser, COrder, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTableDistinct<CUser, COrder2>
      interface ExpectType {
        address: string
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })

    it('invalid', () => {
      type Foo = JoinTableDistinct<CUser, COrder>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTableDistinct<CUser, COrder2>
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

