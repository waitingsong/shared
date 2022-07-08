import assert from 'node:assert/strict'
import { rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { saveHeapSnapshot } from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'

import { CI } from './root.config.js'


// Run this case only with describe.only() !
describe.skip(fileShortPath(import.meta.url), () => {

  describe('should saveHeapSnapshot() work', () => {
    it('normal', async () => {
      const path = join(tmpdir(), 'heap.dump.' + Math.random().toString())
      console.log({ path })
      await saveHeapSnapshot(path)
      assert(path)
      await rm(path)
    })
  })

})
