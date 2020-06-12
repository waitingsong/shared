/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { KeyFromValue } from '../../src/index'

import {
  Alias,
  AliasRecord,
  AliasRecord2,
  alias,
  alias2,
} from './test-model'


const filename = basename(__filename)

describe(filename, () => {

  describe('should AllValues works', () => {
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

