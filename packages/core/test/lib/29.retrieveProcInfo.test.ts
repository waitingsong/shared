import assert from 'node:assert/strict'

import { retrieveProcInfo } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should retrieveProcInfo() work', () => {
    it('normal', async () => {
      const procInfo = await retrieveProcInfo()
      console.log({ procInfo })
      assert(procInfo)
    })
  })

})

