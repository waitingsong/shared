import assert from 'node:assert/strict'

import { Context } from '@midwayjs/koa'
import { fileShortPath } from '@waiting/shared-core'

import { shouldEnableMiddleware } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  const ctx = {} as Context

  describe('should work', () => {
    it('ctx undefined', () => {
      const ret = shouldEnableMiddleware()
      assert(ret === false)
    })

    it('mwConfig undefined', () => {
      const ret = shouldEnableMiddleware(ctx)
      assert(ret === false)
    })
  })

})

