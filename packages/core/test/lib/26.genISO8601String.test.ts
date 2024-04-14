import assert from 'node:assert/strict'

import { genISO8601String } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should genISO8601String() work', () => {
    it('normal', async () => {
      const ret = genISO8601String()
      assert(ret)
      assert(ret.length === 29)
      assert(ret.includes('T'))
      assert(ret.includes(':'))
      assert(ret.includes('.'))
      assert(ret.includes('+') || ret.includes('-'))
    })
  })

})
