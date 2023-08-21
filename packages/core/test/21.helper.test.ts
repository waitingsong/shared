import assert from 'node:assert/strict'
import { sep } from 'node:path'

import { fileShortPath, genCurrentDirname, genCurrentFilename } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should genCurrentFilename() work', () => {
    it('common', async () => {
      const __filename = genCurrentFilename(import.meta.url)
      assert(__filename.endsWith('packages/core/test/21.helper.test.ts'), __filename)
    })

    it('separator -', async () => {
      const __filename = genCurrentFilename(import.meta.url, '-')
      assert(__filename.endsWith('-core-test-21.helper.test.ts'), __filename)
    })

    it(`separator ${sep}`, async () => {
      const __filename = genCurrentFilename(import.meta.url, sep)
      if (sep === '/') {
        assert(__filename.endsWith('packages/core/test/21.helper.test.ts'), __filename)
      }
      else if (sep === '\\') {
        assert(__filename.endsWith('packages\\core\\test\\21.helper.test.ts'), __filename)
      }
    })
  })

  describe('should genCurrentDirname() work', () => {
    it('common', async () => {
      const __dirname = genCurrentDirname(import.meta.url)
      assert(__dirname.endsWith('packages/core/test'), __dirname)
    })

    it('separator -', async () => {
      const __dirname = genCurrentDirname(import.meta.url, '-')
      assert(__dirname.endsWith('-core-test'), __dirname)
    })

    it(`separator ${sep}`, async () => {
      const __dirname = genCurrentDirname(import.meta.url, sep)
      if (sep === '/') {
        assert(__dirname.endsWith('packages/core/test'), __dirname)
      }
      else if (sep === '\\') {
        assert(__dirname.endsWith('packages\\core\\test'), __dirname)
      }
    })
  })
})
