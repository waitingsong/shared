/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { FormatIntersect, Equals } from '../../src/index'

import { AliasRecord } from './test-model'


const filename = basename(__filename)

describe(filename, () => {

  describe('should FormatIntersect works', () => {
    it('normal', () => {
      const ret: FormatIntersect<AliasRecord> = {
        uid: 'tbUserUid',
        name: 'tbUserName',
      }
      assert(ret.uid === 'tbUserUid')
      assert(ret.name === 'tbUserName')
    })
    it('func', () => {
      type F1 = () => void
      type F2 = FormatIntersect<F1>
      const ret: Equals<ReturnType<F2>, void> = true
      const ret2: Equals<ReturnType<F2>, ReturnType<F1>> = true
    })
    it('void', () => {
      type F1 = void
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, void> = true
    })
    it('unknown', () => {
      type F1 = unknown
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, unknown> = true
    })
    it('undefined', () => {
      type F1 = undefined
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, undefined> = true
    })
    it('any', () => {
      type F1 = any
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, any> = true
    })
    it('boolean', () => {
      type F1 = boolean
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, boolean> = true
    })
    it('true', () => {
      type F1 = true
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, true> = true
      const ret2: Equals<F2, false> = false
    })
    it('tuple', () => {
      type F1 = [boolean, 1, 'foo', number, {foo: string}]
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('number', () => {
      type F1 = 123
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('bigint', () => {
      type F1 = bigint
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('string', () => {
      type F1 = string
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('symbol', () => {
      type F1 = symbol
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('Pick', () => {
      type F1 = Pick<User, 'name'>
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('Intersect', () => {
      type F1 = User & Order
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('Intersect 2', () => {
      type F1 = Pick<User, 'name'> & Pick<Order, 'address' | 'ext'>
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
    })
    it('Intersect 3', () => {
      type F1 = Pick<User, 'name'> & Pick<Order, 'address'>
      type F2 = FormatIntersect<F1>
      const ret: Equals<F2, F2> = true
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
  ext: {
    foo: number,
    bar: bigint,
  }
}