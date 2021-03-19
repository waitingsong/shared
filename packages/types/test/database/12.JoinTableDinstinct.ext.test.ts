/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  JoinTableDistinct,
  TableModel,
  Equals,
  FormatIntersect,
  KnownKeys,
  MergeTableDistinct,
} from '../../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTableDistinct works for extends interface', () => {
    it('normal', () => {
      type Foo = JoinTableDistinct<User, Order>
      type K1 = void
      interface ExpectType {
        address: string
        name: string
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

  describe('should JoinTableDistinct works for extends class', () => {
    it('normal', () => {
      type Foo = JoinTableDistinct<CUser, COrder>
      interface ExpectType {
        address: string
        name: string
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

interface User extends TableModel {
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

class CUser implements TableModel {

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

