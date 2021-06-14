/* eslint-disable node/no-extraneous-import */
import { readFile } from 'fs/promises'

import {
  basename,
  join,
} from '@waiting/shared-core'

import {
  humanMemoryUsage,
  retrieveProcInfo,
} from '../src/index'

// eslint-disable-next-line import/order
import assert = require('power-assert')


const filename = basename(__filename)

describe(filename, () => {

  describe('should humanMemoryUsage work', () => {
    it('normal', () => {
      const ret = humanMemoryUsage()
      assert(typeof ret.rss === 'string' && ret.rss)
      assert(typeof ret.pid === 'number' && ret.pid > 0)
    })
  })

  describe('should retrieveProcInfo work', () => {
    it('normal', async () => {
      const ret = await retrieveProcInfo()

      assert(typeof ret.cpuinfo === 'object')
      assert(typeof ret.meminfo === 'object')
      assert(typeof ret.diskstats === 'object')
      assert(typeof ret.stat === 'object')

      if (process.platform === 'linux') {
        assert(Object.keys(ret.cpuinfo).length)
        assert(Object.keys(ret.meminfo).length)
        assert(Object.keys(ret.diskstats).length)
        assert(Object.keys(ret.stat).length)

        assert(ret.cpuinfo['cpu family'])
        assert(ret.meminfo.MemTotal)
        assert(ret.stat.cpu)
      }
    })
  })
})

