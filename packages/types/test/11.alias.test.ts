/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  DateISOString,
  ISO8601String,
} from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should DateISOString works', () => {
    it('normal', () => {
      const dd: DateISOString = '2020-03-03T02:12:53.123Z'
      assert(dd)
    })
    it('pass but invalid', () => {
      const dd: DateISOString = '2020000000000000000-03-03T02:12:53.123Z'
      assert(dd)
    })
  })

  describe('should ISO8601String works', () => {
    it('Z', () => {
      const dd: ISO8601String = '2020-03-03T02:12:53.123Z'
      assert(dd)
    })
    it('pass but invalid', () => {
      const dd: ISO8601String = '2020000000000000000-03-03T02:12:53.123Z'
      assert(dd)
    })

    it('plus timezone offset', () => {
      const dd: ISO8601String = '2021-03-03T10:12:53.123+08:00'
      assert(dd)
    })

    it('minus timezone offset', () => {
      const dd: ISO8601String = '2021-03-03T10:12:53.123-08:00'
      assert(dd)
    })

    it('pass but invalid', () => {
      const dd: ISO8601String = '2021000000-03-03T10:12:53.123+08:00'
      assert(dd)
    })
  })

})

