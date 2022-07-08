import assert from 'node:assert/strict'

import { Headers } from 'undici'

import { retrieveHeadersItem } from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

  describe('should retrieveHeadersItem() work', () => {
    it('result undefined with undefined', () => {
      const ret = retrieveHeadersItem(void 0, 'foo')
      assert(! ret)
    })

    it('result undefined with array', () => {
      const ret = retrieveHeadersItem([], 'foo')
      assert(! ret)
    })

    it('result undefined with Header', () => {
      const header = new Headers()
      const ret = retrieveHeadersItem(header, 'foo')
      assert(! ret)
    })

    it('result valid with Header', () => {
      const header = new Headers()
      const rnd = Math.random().toString()
      header.set('foo', rnd)
      const ret = retrieveHeadersItem(header, 'foo')
      assert(ret === rnd, ret)
    })

    it('result valid with Object', () => {
      const header = {} as Headers
      const rnd = Math.random().toString()
      header['foo'] = rnd
      const ret = retrieveHeadersItem(header, 'foo')
      assert(ret === rnd, ret)
    })

    it('result undefined with Object number', () => {
      const header = {} as Headers
      header['foo'] = 123
      const ret = retrieveHeadersItem(header, 'foo')
      assert(! ret, ret)
    })
  })

})
