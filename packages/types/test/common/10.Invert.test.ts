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
      const ret: Invert<AliasRecord> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('type AliasRecord2 (duplicate value)', () => {
      const ret: Invert<AliasRecord2> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')

      const ret2: Invert<AliasRecord2> = {
        tbUserUid: 'foo', // <-- foo|uid
        tbUserName: 'name',
      }
      assert(ret2.tbUserUid === 'foo')
      assert(ret2.tbUserUid !== 'uid')
      assert(ret2.tbUserName === 'name')
    })
    it('type Alias2Type (duplicate value)', () => {
      const ret: Invert<Alias2Type> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')

      const ret2: Invert<Alias2Type> = {
        tbUserUid: 'foo', // <-- foo|uid
        tbUserName: 'name',
      }
      assert(ret2.tbUserUid === 'foo')
      assert(ret2.tbUserUid !== 'uid')
      assert(ret2.tbUserName === 'name')
    })
    it('type inline', () => {
      const ret: Invert< {uid: 'tbUserUid', name: 'tbUserName'}> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('type Alias (w/o auto-complete)', () => {
      const ret: Invert<Alias> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      // `ret.` w/o auto-complete
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })

    it('constant alias', () => {
      const ret: Invert<typeof alias> = {
        tbUserUid: 'uid',
        tbUserName: 'name',
      }
      assert(ret.tbUserUid === 'uid')
      assert(ret.tbUserName === 'name')
    })

    it('invalid type inline', () => {
      const ret: Invert<AliasRecord> = {
        // @ts-expect-error
        tbUserUid: 'Foo', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('invalid constant alias', () => {
      const ret: Invert<typeof alias> = {
        // @ts-expect-error
        tbUserUid: 'foo', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })
    it('invalid constant alias2', () => {
      const ret: Invert<typeof alias2> = {
        // @ts-expect-error
        tbUserUid: 'Fake', // with validation
        tbUserName: 'name',
      }
      assert(ret.tbUserUid !== 'uid' && ret.tbUserUid !== 'foo')
      assert(ret.tbUserName === 'name')
    })
    it('invalid type Alias', () => {
      const ret: Invert<Alias> = {
        tbUserUid: 'foo', // w/o validation
        tbUserName: 'name',
      }
      // `ret.` w/o auto-complete
      assert(ret.tbUserUid !== 'uid')
      assert(ret.tbUserName === 'name')
    })

  })


})

