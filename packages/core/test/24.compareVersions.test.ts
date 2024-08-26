import assert from 'node:assert'

import { compareVersions } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('compareVersions()', () => {
    it('less then 1', async () => {
      const ver1 = '22.7.0'
      const ver2 = '22.7.1'
      const ret = compareVersions(ver1, ver2)
      assert(ret === -1, `expect -1, but got ${ret}`)
    })
    it('less then 2', async () => {
      const ver1 = '22.7'
      const ver2 = '22.7.1'
      const ret = compareVersions(ver1, ver2)
      assert(ret === -1, `expect -1, but got ${ret}`)
    })
    it('less then 3', async () => {
      const ver1 = '22.7'
      const ver2 = '23.6'
      const ret = compareVersions(ver1, ver2)
      assert(ret === -1, `expect -1, but got ${ret}`)
    })

    it('equal 1', async () => {
      const ver1 = '22.7'
      const ver2 = '22.7.0'
      const ret = compareVersions(ver1, ver2)
      assert(ret === 0, `expect 0, but got ${ret}`)
    })
    it('equal 2', async () => {
      const ver1 = '22.7.0'
      const ver2 = '22.7.0'
      const ret = compareVersions(ver1, ver2)
      assert(ret === 0, `expect 0, but got ${ret}`)
    })
    it('equal 3', async () => {
      const ver1 = '22'
      const ver2 = '22'
      const ret = compareVersions(ver1, ver2)
      assert(ret === 0, `expect 0, but got ${ret}`)
    })

    it('great then 1', async () => {
      const ver1 = '22.7.0'
      const ver2 = '22.7.1'
      const ret = compareVersions(ver2, ver1)
      assert(ret === 1, `expect 1, but got ${ret}`)
    })
    it('great then 2', async () => {
      const ver1 = '22.7'
      const ver2 = '22.7.1'
      const ret = compareVersions(ver2, ver1)
      assert(ret === 1, `expect 1, but got ${ret}`)
    })
    it('great then 3', async () => {
      const ver1 = '22.7'
      const ver2 = '23.6'
      const ret = compareVersions(ver2, ver1)
      assert(ret === 1, `expect 1, but got ${ret}`)
    })
  })
})
