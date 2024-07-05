/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/unbound-method */
import assert from 'node:assert'

import { isArrowFunction } from '##/index.js'
import { fileShortPath } from '##/lib/helper.js'


class Test {
  name: string
  constructor() {
    this.name = 'Test'
  }

  method() {
    return this.name
  }

  arrow = () => {
    return this.name
  }
}


describe(fileShortPath(import.meta.url), () => {
  describe('isArrowFunction()', () => {
    it('normal func', async () => {
      const ret = isArrowFunction(fileShortPath)
      assert(! ret)
    })

    it('arrow func', async () => {
      const ret = isArrowFunction(() => {})
      assert(ret)
    })

    it('class method', async () => {
      const test = new Test()
      const ret = isArrowFunction(test.method)
      assert(! ret)

      const { method } = test
      assert(! isArrowFunction(method))
    })

    it('class arrow method', async () => {
      const test = new Test()
      const ret = isArrowFunction(test.arrow)
      assert(ret)

      const { arrow } = test
      assert(isArrowFunction(arrow))
    })
  })
})

