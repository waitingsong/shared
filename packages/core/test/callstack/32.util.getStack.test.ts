import assert from 'node:assert/strict'


import { getStack } from '../../src/lib/callstack/util.js'
import { fileShortPath } from '../../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {
  describe('should getStack() work ', () => {
    it('normal', () => {
      const callerStack = getStack()
      const arr = callerStack.split('\n')
      assert(arr.length > 1)
      const [line0, line1] = arr
      assert(line0)
      assert(line0.includes('Error'))
      assert(line1)
      assert(line1.includes(import.meta.url))
      assert(true)
    })


  })
})

