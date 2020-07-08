import * as assert from 'power-assert'
import * as rmdir from 'rimraf'

import {
  basename,
  isDirExists,
} from '../src/index'


const filename = basename(__filename)

describe(filename, () => {

  describe('Should isDirExits() works', () => {
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

