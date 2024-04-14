import assert from 'node:assert/strict'

import { genAbsolutePath } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should genAbsolutePath() work', () => {
    it('normal', async () => {
      const ret = genAbsolutePath(import.meta.url)
      console.log({ ret })
      assert(ret)
    })
  })

})

