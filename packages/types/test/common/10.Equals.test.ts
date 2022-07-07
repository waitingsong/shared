import { fileShortPath } from '@waiting/shared-core'

import { Equals } from '../../src/index.js'


describe(fileShortPath(import.meta.url), () => {

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
    it('Record', () => {
      const ret0: Equals<Record<any, number>, Record<string, number>> = true
      const ret1: Equals<Record<string, any>, Record<string, any>> = true
      const ret2: Equals<Record<string, number>, Record<string, number>> = true
      const ret3: Equals<Record<string, string>, {[k: string]: string}> = true
      const ret4: Equals<Record<number, string>, {[k: number]: string}> = true
    })
    it('Map', () => {
      const ret1: Equals<Map<string, number>, Map<string, number>> = true
      const ret2: Equals<Map<string, unknown>, Map<string, unknown>> = true
      const ret3: Equals<Map<string, any>, Map<string, any>> = true
    })
    it('Set', () => {
      const ret1: Equals<Set<string>, Set<string>> = true
      const ret2: Equals<Set<any>, Set<any>> = true
      const ret3: Equals<Set<any[]>, Set<any[]>> = true
    })

    it('never', () => {
      const ret1: Equals<never, never> = true
      type T1 = never
      const ret2: Equals<T1, never> = true
    })

    it('types 1', () => {
      interface A { p: string | number }
      type B = { p: string } | { p: number }
      const expectedTrue: Equals<A, B> = false
    })

    // it('types 2', () => {
    //   type A = { x: 1 } & { y: 2 }
    //   interface B { x: 1, y: 2 }
    //   const expectedTrue: Equals<A, B> = true
    // })

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
    it('Record', () => {
      const ret1: Equals<Record<string, any>, Record<string, string>> = false
      const ret2: Equals<Record<string, number>, Record<string, any>> = false
      const ret3: Equals<Record<string, string>, {[k: number]: string}> = false
      const ret4: Equals<Record<string | number, string>, {[k: number]: string}> = false
      const ret5: Equals<Record<string, string>, Map<string, string>> = false
    })
    it('Map', () => {
      const ret1: Equals<Map<any, number>, Map<string, number>> = false
      const ret2: Equals<Map<any, unknown>, Map<string, unknown>> = false
      const ret3: Equals<Map<string, any>, {[k: string]: any}> = false
    })
    it('Set', () => {
      const ret1: Equals<Set<string>, Set<number>> = false
      const ret2: Equals<Set<any>, Set<unknown>> = false
      const ret3: Equals<Set<any[]>, Set<string[]>> = false
    })

    it('optional', () => {
      interface F1 {
        foo: number
        bar: string
      }
      interface F2 {
        foo: number
        bar?: string
      }
      const ret1: Equals<F1, F2> = false
    })
  })

})

