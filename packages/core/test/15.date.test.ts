/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { genISO8601String } from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should genISOString works', () => {
    it('pass param', () => {
      const dd = new Date()
      const ret = genISO8601String(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 999', () => {
      const dd = new Date('2021-03-17T12:21:21.999')
      const ret = genISO8601String(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 024', () => {
      const dd = new Date('2021-03-17T12:21:21.024Z')
      const ret = genISO8601String(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('pass param 001', () => {
      const dd = new Date('2021-03-17T12:21:21.001Z')
      const ret = genISO8601String(dd)
      const dd2 = new Date(ret).toISOString()
      assert(dd.toISOString() === dd2)
    })

    it('w/o param', () => {
      const ret = genISO8601String()
      const dd = new Date(ret)
      const ret2 = genISO8601String(dd)
      assert(ret === ret2)
    })
  })

})

