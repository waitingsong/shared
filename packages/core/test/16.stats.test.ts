/* eslint-disable node/no-extraneous-import */
import {
  basename,
  join,
} from '@waiting/shared-core'

import { humanMemoryUsage } from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should humanMemoryUsage work', () => {
    it('normal', () => {
      const ret = humanMemoryUsage()
      assert(typeof ret.rss === 'string' && ret.rss)
    })
  })

})

