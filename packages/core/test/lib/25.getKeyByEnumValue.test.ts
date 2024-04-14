import assert from 'node:assert/strict'

import { getKeyByEnumValue } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should getKeyByEnumValue() work', () => {
    it('normal', async () => {
      enum TestEnum {
        path1 = 'v1',
        path2 = 'v2',
      }
      const k1 = getKeyByEnumValue(TestEnum, 'v1')
      assert(k1 === 'path1')
      const k2 = getKeyByEnumValue(TestEnum, 'v2')
      assert(k2 === 'path2')
      const k3 = getKeyByEnumValue(TestEnum, 'v3')
      assert(! k3)
    })
  })

})
