import assert from 'node:assert/strict'

import { bigIntMax } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should bigIntMax() work', () => {
    it('normal', async () => {
      const min = 1n
      const max = 99n
      const ret = bigIntMax(min, max)
      assert(ret === max)
    })

    it('more', async () => {
      const min = 1n
      const max = 99n
      const ret = bigIntMax(98n, min, max, 1n, 3n)
      assert(ret === max)
    })
  })

})

