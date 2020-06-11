/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { AllValues } from '../../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should AllValues works', () => {
    const alias = {
      uid: 'tbUserUid',
      name: 'tbUserName',
    } as const

    it('normal type', () => {
      type R = AllValues<Record<'uid', 'tbUserUid'>>
      const ret: R = {
        key: 'uid',
        value: 'tbUserUid',
      }
      assert(ret.key === 'uid')
      assert(ret.value === 'tbUserUid')
    })
    it('normal var', () => {
      const ret1: AllValues<typeof alias> = {
        key: 'uid',
        value: 'tbUserUid',
      }
      assert(ret1.key === 'uid')
      assert(ret1.value === 'tbUserUid')

      const ret2: AllValues<typeof alias> = {
        key: 'name',
        value: 'tbUserName',
      }
      assert(ret2.key === 'name')
      assert(ret2.value === 'tbUserName')
    })

    it('invalid type key', () => {
      type R = AllValues<Record<'uid', 'tbUserUid'>>
      const ret: R = {
        // @ts-expect-error
        key: 'Foo',
        value: 'tbUserUid',
      }
      assert(ret.key !== 'uid')
      assert(ret.value === 'tbUserUid')
    })
    it('invalid type value', () => {
      type R = AllValues<Record<'uid', 'tbUserUid'>>
      const ret: R = {
        key: 'uid',
        // @ts-expect-error
        value: 'foo',
      }
      assert(ret.key === 'uid')
      assert(ret.value !== 'tbUserUid')
    })

    it('invalid var key', () => {
      const ret: AllValues<typeof alias> = {
        // @ts-expect-error
        key: 'Foo',
        value: 'tbUserUid',
      }
      assert(ret.key !== 'uid')
      assert(ret.value === 'tbUserUid')
    })
    it('invalid var value', () => {
      const ret: AllValues<typeof alias> = {
        key: 'uid',
        // @ts-expect-error
        value: 'Foo',
      }
      assert(ret.key === 'uid')
      assert(ret.value !== alias.uid)

      // @ts-expect-error
      const ret2: AllValues<typeof alias> = {
        key: 'uid',
        value: 'tbUserName', // <-- also invalid!
      }
      assert(ret2.key === 'uid')
      assert(ret2.value !== alias.uid)
    })
  })


})

