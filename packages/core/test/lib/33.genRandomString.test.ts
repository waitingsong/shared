import assert from 'node:assert/strict'

import { bigIntMax } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'
import { genRandomString } from '##/lib/utils.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should genRandomString() work', () => {
    it('normal', async () => {
      const str = genRandomString()
      assert(str.length === 32)
    })

    it('len 8', async () => {
      const str = genRandomString(8)
      assert(str.length === 8)
    })

    it('len zero', async () => {
      try {
        genRandomString(0)
      }
      catch (ex) {
        assert(ex instanceof Error)
        return
      }
      assert(false, 'should throw error')
    })
    it('len -1', async () => {
      try {
        genRandomString(-1)
      }
      catch (ex) {
        assert(ex instanceof Error)
        return
      }
      assert(false, 'should throw error')
    })
  })

})

