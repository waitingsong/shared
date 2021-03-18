/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'
import * as assert from 'power-assert'

import { genISOString } from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('should genISOString works', () => {
    it('pass param', () => {
      const dd = new Date()
      const ret = genISOString(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 999', () => {
      const dd = new Date('2021-03-17T12:21:21.999')
      const ret = genISOString(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 024', () => {
      const dd = new Date('2021-03-17T12:21:21.024Z')
      const ret = genISOString(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 001', () => {
      const dd = new Date('2021-03-17T12:21:21.001Z')
      const ret = genISOString(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('w/o param', () => {
      const ret = genISOString()
      const dd = new Date(ret)
      const ret2 = genISOString(dd)
      assert(ret === ret2)
    })
  })

})

