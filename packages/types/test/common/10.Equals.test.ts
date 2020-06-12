/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { Equals } from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should Equals return true', () => {
    it('true:true', () => {
      const ret: Equals<true, true> = true
    })
    it('false:false', () => {
      const ret: Equals<false, false> = true
    })
    it('any,any', () => {
      const ret: Equals<any, any> = true
    })
    it('unknown,unknown', () => {
      const ret: Equals<unknown, unknown> = true
    })
    it('void,void', () => {
      const ret: Equals<void, void> = true
    })
    it('null,null', () => {
      const ret: Equals<null, null> = true
    })
    it('undefined,undefined', () => {
      const ret: Equals<undefined, undefined> = true
    })
    it('foo,foo', () => {
      const ret: Equals<'foo', 'foo'> = true
    })
    it('12,12', () => {
      const ret: Equals<12, 12> = true
    })
    it('12n,12n', () => {
      const ret: Equals<12n, 12n> = true
    })
    it('0.12,0.12', () => {
      const ret: Equals<0.12, 0.12> = true
    })
    it('foo|bar,bar|foo', () => {
      const ret: Equals<'foo' | 'bar', 'foo' | 'bar'> = true
      const ret2: Equals<'foo' | 'bar', 'bar' | 'foo'> = true
    })
    it('["foo"],["foo"]', () => {
      const ret: Equals<['foo'], ['foo']> = true
    })
    it('["foo", "bar"],["foo", "bar"]', () => {
      const ret: Equals<['foo', 'bar'], ['foo', 'bar']> = true
    })
    it('() => void, () => void', () => {
      const ret: Equals<() => void, () => void> = true
    })
  })


  describe('should Equals return false', () => {
    it('true:false', () => {
      const ret: Equals<true, false> = false
    })
    it('any,unknown', () => {
      const ret: Equals<any, unknown> = false
    })
    it('unknown,false', () => {
      const ret: Equals<unknown, false> = false
    })
    it('void,null', () => {
      const ret: Equals<void, null> = false
    })
    it('null,false', () => {
      const ret: Equals<null, false> = false
    })
    it('undefined,null', () => {
      const ret: Equals<undefined, null> = false
    })
    it('foo,true', () => {
      const ret: Equals<'foo', true> = false
    })
    it('12,12n', () => {
      const ret: Equals<12, 12n> = false
    })
    it('12,"12"', () => {
      const ret: Equals<12, '12'> = false
    })
    it('12n,"12"', () => {
      const ret: Equals<12n, '12'> = false
    })
    it('0.12,"0.12"', () => {
      const ret: Equals<0.12, '0.12'> = false
    })
    it('foo|bar,foo', () => {
      const ret: Equals<'foo' | 'bar', 'foo'> = false
    })
    it('foo|bar,barz|foo', () => {
      const ret: Equals<'foo' | 'bar', 'foo' | 'barz'> = false
      const ret2: Equals<'foo' | 'bar', 'barz' | 'foo'> = false
    })
    it('["foo"],["bar"]', () => {
      const ret: Equals<['foo'], ['bar']> = false
    })
    it('["foo", "bar"],["bar", "foo"]', () => {
      const ret: Equals<['foo', 'bar'], ['bar', 'foo']> = false
    })
    it('() => void, () => undefined', () => {
      const ret: Equals<() => void, () => undefined> = false
    })
  })

})

