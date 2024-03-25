/* eslint-disable no-await-in-loop */
import assert from 'node:assert/strict'

import { isDirExists } from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('Should isDirExits() work', () => {
    it('spec relative dir', async () => {
      const arr = ['.', './', '..', '../']
      for (const dir of arr) {
        const ret = await isDirExists(dir)
        assert(ret === true, `dir should not exists, path: "${dir}"`)
      }
    })
    it('relative dir', async () => {
      // baseDir is package
      const arr = ['test', 'test/fixtures', '../core/test']
      for (const dir of arr) {
        const ret = await isDirExists(dir)
        assert(ret === true, `dir should not exists, path: "${dir}"`)
      }
    })
  })

})

