/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { Invert } from '../../src/index'

import {
  Alias,
  AliasRecord,
  AliasRecord2,
  Alias2Type,
  alias,
  alias2,
} from './test-model'


const filename = basename(__filename)

describe(filename, () => {

  describe('should AllValues works', () => {
    it('type AliasRecord', () => {
      type T1 = Invert<AliasRecord>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('type AliasRecord2 (duplicate value)', () => {
      type T1 = Invert<AliasRecord2>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')

      const ret2: T1 = {
        tbUserUid: 'foo', // <-- foo|uid
        tbUserName: 'name',
      }
      assert(ret2.tbUserUid === 'foo')
      assert(ret2.tbUserUid !== 'uid')
      assert(ret2.tbUserName === 'name')
    })
    it('type Alias2Type (duplicate value)', () => {
      type T1 = Invert<Alias2Type>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')

      const ret2: T1 = {
        tbUserUid: 'foo', // <-- foo|uid
        tbUserName: 'name',
      }
      assert(ret2.tbUserUid === 'foo')
      assert(ret2.tbUserUid !== 'uid')
      assert(ret2.tbUserName === 'name')
    })
    it('type inline', () => {
      type T1 = Invert<{uid: 'tbUserUid', name: 'tbUserName'}>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('type Alias (w/o auto-complete)', () => {
      type T1 = Invert<Alias>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      // `ret.` w/o auto-complete
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })

    it('constant alias', () => {
      type T1 = Invert<typeof alias>
      const ret: T1 = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })

    it('invalid type inline', () => {
      type T1 = Invert<AliasRecord>
      const ret: T1 = {
        // @ts-expect-error
        tbUserUid: 'Foo', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('invalid constant alias', () => {
      type T1 = Invert<typeof alias>
      const ret: T1 = {
        // @ts-expect-error
        tbUserUid: 'foo', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('invalid constant alias2', () => {
      type T1 = Invert<typeof alias2>
      const ret: T1 = {
        // @ts-expect-error
        tbUserUid: 'Fake', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid' && ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')
    })
    it('invalid type Alias', () => {
      type T1 = Invert<typeof alias>
      const ret: T1 = {
        // @ts-expect-error
        tbUserUid: 'foo', // w/o validation
        tbUserName: 'name',
      }
      // `ret.` w/o auto-complete
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })

  })


})

