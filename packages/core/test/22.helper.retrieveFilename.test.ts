import assert from 'node:assert'

import { fileShortPath, retrieveFilename } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('retrieveFilename()', () => {
    it('common', () => {
      const __filename = retrieveFilename(import.meta)
      assert(__filename.replaceAll('\\', '/').endsWith('packages/core/test/22.helper.retrieveFilename.test.ts'), __filename)
    })
  })

})
