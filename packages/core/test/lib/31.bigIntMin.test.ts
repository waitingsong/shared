import assert from 'node:assert/strict'

import { bigIntMin } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should bigIntMin() work', () => {
    it('normal', async () => {
      const min = 1n
      const max = 2n
      const ret = bigIntMin(min, max)
      assert(ret === min)
    })
  })

})

