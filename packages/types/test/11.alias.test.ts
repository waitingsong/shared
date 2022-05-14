import assert from 'assert/strict'

import {
  DateISOString,
  ISO8601String,
} from '../src/index.js'


describe('11.alias.test.ts', () => {

  describe('should DateISOString work', () => {
    it('normal', () => {
      const dd: DateISOString = '2020-03-03T02:12:53.123Z'
      assert(dd)
    })
    it('pass but invalid', () => {
      const dd: DateISOString = '2020000000000000000-03-03T02:12:53.123Z'
      assert(dd)
    })
  })

  describe('should ISO8601String work', () => {
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

