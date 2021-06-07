/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { Equals, KeyFromValue } from '../../src/index'

import {
  Alias,
  AliasRecord,
  AliasRecord2,
  alias,
  alias2,
} from './test-model'

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

  addr: unknown;

  [k: string]: unknown

}
class CUser3 extends CUser2 {

  json: any

}

describe(filename, () => {
  describe('should KeyFromValue work for class', () => {
    it('type bigint', () => {
      type T1 = KeyFromValue<CUser1, bigint>
      type Expect = 'uid'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, bigint>
      type Expect2 = 'uid' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, bigint>
      type Expect3 = 'uid' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type number', () => {
      type T1 = KeyFromValue<CUser1, number>
      type Expect = 'age' | 'gender'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, number>
      type Expect2 = 'age' | 'gender' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, number>
      type Expect3 = 'age' | 'gender' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type string', () => {
      type T1 = KeyFromValue<CUser1, string>
      type Expect = 'name'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, string>
      type Expect2 = 'name' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, string>
      type Expect3 = 'name' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type Date', () => {
      type T1 = KeyFromValue<CUser1, Date>
      type Expect = 'mtime' | 'ctime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, Date>
      type Expect2 = 'mtime' | 'ctime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, Date>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type null', () => {
      type T1 = KeyFromValue<CUser1, null>
      type Expect = 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, null>
      type Expect2 = 'mtime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, null>
      type Expect3 = 'mtime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type undefined', () => {
      type T1 = KeyFromValue<CUser1, undefined>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, undefined>
      type Expect2 = 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, undefined>
      type Expect3 = 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type unknown', () => {
      type T1 = KeyFromValue<CUser1, unknown>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, unknown>
      type Expect2 = 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, unknown>
      type Expect3 = 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })


    it('type Date | null', () => {
      type T1 = KeyFromValue<CUser1, Date | null>
      type Expect = 'mtime' | 'ctime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, Date | null>
      type Expect2 = 'mtime' | 'ctime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, Date | null>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })

    it('type Date | string', () => {
      type T1 = KeyFromValue<CUser1, Date | string>
      type Expect = 'mtime' | 'ctime' | 'name'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, Date | string>
      type Expect2 = 'mtime' | 'ctime' | 'addr' | 'name'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, Date | string>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json' | 'name'
      const t3: Equals<T3, Expect3> = true
    })
    it('type never', () => {
      type T1 = KeyFromValue<CUser1, never>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<CUser2, never>
      type Expect2 = never
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<CUser3, never>
      type Expect3 = never
      const t3: Equals<T3, Expect3> = true
    })

  })


  describe('should KeyFromValue work for interface', () => {
    it('type bigint', () => {
      type T1 = KeyFromValue<User1, bigint>
      type Expect = 'uid'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, bigint>
      type Expect2 = 'uid' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, bigint>
      type Expect3 = 'uid' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type number', () => {
      type T1 = KeyFromValue<User1, number>
      type Expect = 'age' | 'gender'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, number>
      type Expect2 = 'age' | 'gender' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, number>
      type Expect3 = 'age' | 'gender' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type string', () => {
      type T1 = KeyFromValue<User1, string>
      type Expect = 'name'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, string>
      type Expect2 = 'name' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, string>
      type Expect3 = 'name' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type Date', () => {
      type T1 = KeyFromValue<User1, Date>
      type Expect = 'mtime' | 'ctime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, Date>
      type Expect2 = 'mtime' | 'ctime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, Date>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type null', () => {
      type T1 = KeyFromValue<User1, null>
      type Expect = 'mtime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, null>
      type Expect2 = 'mtime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, null>
      type Expect3 = 'mtime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type undefined', () => {
      type T1 = KeyFromValue<User1, undefined>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, undefined>
      type Expect2 = 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, undefined>
      type Expect3 = 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type unknown', () => {
      type T1 = KeyFromValue<User1, unknown>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, unknown>
      type Expect2 = 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, unknown>
      type Expect3 = 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })
    it('type never', () => {
      type T1 = KeyFromValue<User1, never>
      type Expect = never
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, never>
      type Expect2 = never
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, never>
      type Expect3 = never
      const t3: Equals<T3, Expect3> = true
    })


    it('type Date | null', () => {
      type T1 = KeyFromValue<User1, Date | null>
      type Expect = 'mtime' | 'ctime'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, Date | null>
      type Expect2 = 'mtime' | 'ctime' | 'addr'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, Date | null>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json'
      const t3: Equals<T3, Expect3> = true
    })

    it('type Date | string', () => {
      type T1 = KeyFromValue<User1, Date | string>
      type Expect = 'mtime' | 'ctime' | 'name'
      const t1: Equals<T1, Expect> = true

      type T2 = KeyFromValue<User2, Date | string>
      type Expect2 = 'mtime' | 'ctime' | 'addr' | 'name'
      const t2: Equals<T2, Expect2> = true

      type T3 = KeyFromValue<User3, Date | string>
      type Expect3 = 'mtime' | 'ctime' | 'addr' | 'json' | 'name'
      const t3: Equals<T3, Expect3> = true
    })


    it('type AliasRecord', () => {
      const ret: KeyFromValue<AliasRecord, 'tbUserUid'> = 'uid'
      assert(ret === 'uid')

      const ret2: KeyFromValue<AliasRecord, 'tbUserUid' | 'tbUserName'> = 'uid'
      assert(ret2 === 'uid')

      const ret3: KeyFromValue<AliasRecord, 'tbUserUid' | 'tbUserName'> = 'name'
      assert(ret3 === 'name')
    })
    it('type AliasRecord2 (dupliate value)', () => {
      const ret: KeyFromValue<AliasRecord2, 'tbUserUid'> = 'uid'
      assert(ret === 'uid')
      const ret2: KeyFromValue<AliasRecord2, 'tbUserUid'> = 'foo'
      assert(ret2 === 'foo')

      const ret3: KeyFromValue<
      {uid: 'tbUserUid', name: 'tbUserName', foo: 'tbUserUid'},
      'tbUserUid'
      > = 'uid'
      assert(ret3 === 'uid')
      const ret4: KeyFromValue<
      {uid: 'tbUserUid', name: 'tbUserName', foo: 'tbUserUid'},
      'tbUserUid'
      > = 'foo'
      assert(ret4 === 'foo')
    })
    it('type inline', () => {
      const ret: KeyFromValue<
      {uid: 'tbUserUid', name: 'tbUserName'},
      'tbUserUid'
      > = 'uid'
      assert(ret === 'uid')

      const ret2: KeyFromValue<
      {uid: 'tbUserUid', name: 'tbUserName'},
      'tbUserUid'
      > = 'uid'
      assert(ret2 === 'uid')

      const ret3: KeyFromValue<
      {uid: 'tbUserUid', name: 'tbUserName'},
      'tbUserUid' | 'tbUserName'
      > = 'name'
      assert(ret3 === 'name')
    })
    it('type Alias (w/o auto-complete)', () => {
      const ret: KeyFromValue<Alias, 'tbUserUid'> = 'uid'
      assert(ret === 'uid')

      const ret2: KeyFromValue<Alias, 'tbUserUid' | 'tbUserName'> = 'uid'
      assert(ret2 === 'uid')

      const ret3: KeyFromValue<Alias, 'tbUserUid' | 'tbUserName'> = 'name'
      assert(ret3 === 'name')
    })

    it('constant alias', () => {
      const ret: KeyFromValue<typeof alias, 'tbUserUid'> = 'uid'
      assert(ret === 'uid')

      const ret2: KeyFromValue<typeof alias, 'tbUserUid' | 'tbUserName'> = 'uid'
      assert(ret2 === 'uid')
      const ret3: KeyFromValue<typeof alias, 'tbUserUid' | 'tbUserName'> = 'name'
      assert(ret3 === 'name')
    })
    it('constant alias2 (duplicate value)', () => {
      const ret: KeyFromValue<typeof alias2, 'tbUserUid'> = 'uid'
      assert(ret === 'uid')
      const ret2: KeyFromValue<typeof alias2, 'tbUserUid'> = 'foo'
      assert(ret2 === 'foo')

      const ret3: KeyFromValue<typeof alias2, 'tbUserUid' | 'tbUserName'> = 'uid'
      assert(ret3 === 'uid')
      const ret4: KeyFromValue<typeof alias2, 'tbUserUid' | 'tbUserName'> = 'name'
      assert(ret4 === 'name')
      const ret5: KeyFromValue<typeof alias2, 'tbUserUid' | 'tbUserName'> = 'foo'
      assert(ret5 === 'foo')
    })

    it('invalid type inline', () => {
      // @ts-expect-error
      const ret: KeyFromValue<{uid: 'tbUserUid', name: 'tbUserName'}, 'foo'> = 'uid' // never
    })
    it('invalid constant alias', () => {
      // @ts-expect-error
      const ret: KeyFromValue<typeof alias, 'foo'> = 'uid' // never
    })
    it('invalid constant alias2', () => {
      // @ts-expect-error
      const ret: KeyFromValue<typeof alias2, 'foo'> = 'uid' // never
    })
  })


})

