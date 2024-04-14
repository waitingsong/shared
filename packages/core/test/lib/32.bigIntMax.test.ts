import assert from 'node:assert/strict'

import { bigIntMax } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should bigIntMax() work', () => {
    it('normal', async () => {
      const min = 1n
      const max = 2n
      const ret = bigIntMax(min, max)
      assert(ret === max)
    })
  })

})

