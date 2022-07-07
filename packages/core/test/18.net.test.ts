import assert from 'node:assert/strict'
import { join } from 'node:path'

import { retrieveFirstIp } from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should retrieveFirstIp() work', () => {
    it('normal', () => {
      const ip = retrieveFirstIp()
      assert(ip)
    })
  })

})
