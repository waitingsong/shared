/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import {
  JoinTable,
  JoinTableDistinct,
  Equals,
} from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should JoinTable works', () => {
    it('normal', () => {
      type Foo = JoinTable<User, Order>
      interface ExpectType {
        address: string
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('normal with KeyExcludeOptional', () => {
      type Foo = JoinTable<User, Order, 'uid' | 'name'>
      interface ExpectType {
        address: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('unknown', () => {
      type Foo = JoinTable<User, Order2>
      interface ExpectType {
        address: string
        uid: unknown // <--
        name: string
      }
      const ret: Equals<Foo, ExpectType> = true
    })
    it('invalid', () => {
      type Foo = JoinTable<User, Order>
      interface ExpectType {
        uid: number
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
    it('invalid 2', () => {
      type Foo = JoinTable<User, Order2>
      interface ExpectType {
        address: string
        uid: any
        name: string
      }
      const ret: Equals<Foo, ExpectType> = false
    })
  })

  describe('should JoinTableUnique works', () => {
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
    it('normal 2', () => {
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
        uid: number // <--
        address: string
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

