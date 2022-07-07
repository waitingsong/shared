import assert from 'node:assert/strict'

import { fileShortPath } from '@waiting/shared-core'

import { dummyForCI } from '../src/index.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should dummy work', () => {
    it('normal', () => {
      assert(dummyForCI === true)
    })
  })
})
