import assert from 'node:assert/strict'

import { bigIntMin } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should bigIntMin() work', () => {
    it('normal', async () => {
      const min = 1n
      const max = 99n
      const ret = bigIntMin(min, max)
      assert(ret === min)
    })

    it('more', async () => {
      const min = 1n
      const max = 99n
      const ret = bigIntMin(98n, min, max, 1n, 3n)
      assert(ret === min)
    })
  })

})

