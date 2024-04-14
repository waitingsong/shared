import assert from 'node:assert/strict'

import { isPathMatchRules } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should isPathMatchRules() work', () => {
    it('empty path', async () => {
      const path = ''
      const ret = isPathMatchRules(path)
      assert(! ret)
    })

    it('empty rules', async () => {
      const path = '/test'
      const ret = isPathMatchRules(path)
      assert(! ret)

      const ret2 = isPathMatchRules(path, [])
      assert(! ret2)
    })

    it('/test', async () => {
      const path = '/test'
      const rules = ['', '/test']
      const ret = isPathMatchRules(path, rules)
      assert(ret)
    })

    it('regex', async () => {
      const path = '/test'
      const path2 = 'test'
      const rules = ['', /^\/test/u]
      const ret = isPathMatchRules(path, rules)
      assert(ret)

      const ret2 = isPathMatchRules(path2, rules)
      assert(! ret2)
    })

    it('function', async () => {
      const path = '/test'
      const path2 = 'test'
      const rules = [(input: string) => {
        if (input === '/test') {
          return true
        }
        return false
      }]
      const ret = isPathMatchRules(path, rules)
      assert(ret)

      const ret2 = isPathMatchRules(path2, rules)
      assert(! ret2)
    })
  })

})

