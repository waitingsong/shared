import assert from 'node:assert/strict'

import { expandFFIParamArray } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('expandFFIParamArray() work', () => {
    it('normal', async () => {
      const input = ['a', 'b', 'c', 'd']
      const expect = [['a', 'b', 'c', 'd']]
      const ret = expandFFIParamArray(input)
      assert(ret)
      assert.deepStrictEqual(ret, expect)
    })

    it('one nested', async () => {
      const input = ['a', 'b', ['c', 'd']]
      const expect = [['a', 'b', 'c'], ['a', 'b', 'd']]
      const ret = expandFFIParamArray(input)
      assert(ret)
      assert.deepStrictEqual(ret, expect)
    })

    it('two nested', async () => {
      const input = ['a', ['b1', 'b2'], ['c', 'd']]
      const expect = [
        ['a', 'b1', 'c'],
        ['a', 'b1', 'd'],
        ['a', 'b2', 'c'],
        ['a', 'b2', 'd'],
      ]
      const ret = expandFFIParamArray(input)
      assert(ret)
      assert.deepStrictEqual(ret, expect)
    })
  })

})

