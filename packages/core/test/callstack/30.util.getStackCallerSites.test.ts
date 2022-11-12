import assert from 'node:assert/strict'

import { getStackCallerSites } from '../../src/lib/callstack/util.js'
import { fileShortPath } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should getStackCallerSites work ', () => {
    it('normal', () => {
      const sites = getStackCallerSites()
      assert(sites.length > 0)
      validaFileName(sites[0])
    })

    it('stackTraceLimit: 1', () => {
      const limit = 1
      const sites = getStackCallerSites(limit)
      assert(sites.length === limit)
      validaFileName(sites[0])
    })

    it('stackTraceLimit: 2', () => {
      const limit = 2
      const sites = getStackCallerSites(limit)
      assert(sites.length === limit)
      validaFileName(sites[0])
    })
  })
})

function validaFileName(site?: NodeJS.CallSite): void {
  assert(site, 'should has site')
  const str1 = import.meta.url
  const fileName = site.getFileName()
  assert(fileName === str1)
}
