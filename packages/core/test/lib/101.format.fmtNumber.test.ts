import assert from 'node:assert'

import type { FmtNumberOptions } from '##/index.js'
import { fmtNumber, isWin32 } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'

// https://juejin.cn/post/6979515365227233294

describe(fileShortPath(import.meta.url), () => {
  describe('fmtNumber()', () => {
    it('normal', () => {
      const ret = fmtNumber(123456.7890)
      assert(ret === '123,456.79', ret)
    })

    it('maximumFractionDigits=3', () => {
      const opts: FmtNumberOptions = {
        maximumFractionDigits: 3,
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123,456.78', ret)
    })

    it('maximumFractionDigits=3, minimumFractionDigits=3', () => {
      const opts: FmtNumberOptions = {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123,456.780', ret)
    })

    it('locales=zh-Hans-CN', () => {
      const opts: FmtNumberOptions = {
        locales: 'zh-Hans-CN',
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123,456.78', ret)
    })

    it('locales=zh-Hans-CN-u-nu-hanidec', () => {
      const opts: FmtNumberOptions = {
        locales: 'zh-Hans-CN-u-nu-hanidec',
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '一二三,四五六.七八', ret)
    })

    it('locales=en-US', () => {
      const opts: FmtNumberOptions = {
        locales: 'en-US',
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123,456.78', ret)
    })

    it('locales=de-DE', () => {
      const opts: FmtNumberOptions = {
        locales: 'de-DE',
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123.456,78', ret)
    })

    it('style=currency, locales=de-DE, currency=EUR', () => {
      const opts: FmtNumberOptions = {
        locales: 'de-DE',
        style: 'currency',
        currency: 'EUR',
      }
      const ret = fmtNumber(123456.7804, opts)
      assert(ret === '123.456,78 €', ret)
    })

    it('style=currency, currency=CNY', () => {
      const opts: FmtNumberOptions = {
        style: 'currency',
        currency: 'CNY',
      }
      const ret = fmtNumber(123456.7804, opts)
      if (isWin32) {
        const expected = '¥123,456.78'
        assert(ret === expected, `got: "${ret}", length: ${ret.length}; expected: "${expected}", length: ${expected.length}`)
      }
      else {
        console.log(ret.length)
        console.log('CN¥123,456.78'.length)
        assert(ret === 'CN¥123,456.78', ret)
      }
    })


    it('human-readable notation=compact en-US', () => {
      const arr = [1234, 123456.78967, 1234567.90, 12345678.90, 1223562434, 1223562434454, 12235624344544165n]
      const expected = ['1.23K', '123.46K', '1.23M', '12.35M', '1.22B', '1.22T', '12,235.62T']
      const opts: FmtNumberOptions = {
        locales: 'en-US',
        notation: 'compact',
      }

      const rets = arr.map(num => fmtNumber(num, opts))
      console.log(rets)
      assert.deepStrictEqual(rets, expected)
    })

    it('human-readable notation=compact zh-CN', () => {
      const arr = [1234, 123456.78967, 1234567.90, 12345678.90, 1223562434, 1223562434454, 12235624344544165n]
      const expected = ['1234.00', '12.35万', '123.46万', '1234.57万', '12.24亿', '1.22万亿', '12,235.62万亿']
      const opts: FmtNumberOptions = {
        locales: 'zh-CN',
        notation: 'compact',
      }

      const rets = arr.map((num) => {
        return fmtNumber(num, opts)
      })
      console.log(rets)
      assert.deepStrictEqual(rets, expected)
    })


    it('percent', () => {
      const arr = [0.01, 1.2, 0.0123, 0.01235]
      const expected = ['1.00%', '120.00%', '1.23%', '1.24%']
      const opts: FmtNumberOptions = {
        style: 'percent',
      }

      const rets = arr.map(num => fmtNumber(num, opts))
      console.log(rets)
      assert.deepStrictEqual(rets, expected)
    })

    it('percent minimumFractionDigits=0', () => {
      const arr = [0.01, 1.2, 0.0123, 0.01235]
      const expected = ['1%', '120%', '1.23%', '1.24%']
      const opts: FmtNumberOptions = {
        style: 'percent',
        minimumFractionDigits: 0,
      }

      const rets = arr.map(num => fmtNumber(num, opts))
      console.log(rets)
      assert.deepStrictEqual(rets, expected)
    })
  })
})

