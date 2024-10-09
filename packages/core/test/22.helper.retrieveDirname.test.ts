import assert from 'node:assert'

import { fileShortPath, retrieveDirname } from '##/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('retrieveDirname()', () => {
    it('common', () => {
      const __dirname = retrieveDirname(import.meta)
      assert(__dirname.replaceAll('\\', '/').endsWith('packages/core/test'), __dirname)
    })
  })

})
