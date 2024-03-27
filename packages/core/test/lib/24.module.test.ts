import assert from 'node:assert/strict'
import { mkdir, rmdir } from 'node:fs/promises'
import { join } from 'node:path'

import { fileShortPath, genCurrentDirname } from '##/lib/helper.js'
import { genModuleAbsolutePathIfExists } from '##/lib/module.js'


describe(fileShortPath(import.meta.url), () => {

  const projectDir = join(genCurrentDirname(import.meta.url), '../../../..')

  describe('should genModuleAbsolutePathIfExists() work', () => {
    it('module exists', async () => {
      const path = 'node_modules/@waiting/eslint-config'
      const path2 = join(projectDir, path)
      const ret = await genModuleAbsolutePathIfExists(projectDir, path)
      console.log({ projectDir, path, ret })
      assert(typeof ret === 'string')
      assert(ret.length > 0)
      assert(ret === path2)
    })

    it('module not exists', async () => {
      const path = 'node_modules/test-' + Math.random().toString(36)
      const path2 = join(projectDir, path)
      await mkdir(path2, { recursive: true })
      const ret = await genModuleAbsolutePathIfExists(projectDir, path)
      assert(! ret)
      await rmdir(path2, { recursive: true })
    })

  })

})
