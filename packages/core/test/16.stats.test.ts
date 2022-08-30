import assert from 'node:assert/strict'

import {
  humanMemoryUsage,
  retrieveProcInfo,
} from '../src/index.js'
import { fileShortPath } from '../src/lib/helper.js'


describe(fileShortPath(import.meta.url), () => {

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

      if (process.platform === 'linux') {
        assert(typeof ret.cpuinfo === 'object')
        assert(typeof ret.meminfo === 'object')
        assert(typeof ret.diskstats === 'object')
        assert(typeof ret.stat === 'object')

        assert(Object.keys(ret.cpuinfo).length)
        assert(Object.keys(ret.meminfo).length)
        assert(Object.keys(ret.diskstats).length)
        assert(Object.keys(ret.stat).length)

        assert(ret.cpuinfo['cpu family'])
        assert(ret.meminfo.MemTotal)
        assert(ret.stat.cpu)
      }
    })

    it('cpuinfo', async () => {
      const ret = await retrieveProcInfo(['cpuinfo'])

      if (process.platform === 'linux') {
        assert(typeof ret.cpuinfo === 'object')
        assert(Object.keys(ret.cpuinfo).length)
        assert(ret.cpuinfo['cpu family'])
      }
    })

    it('cpuinfo and diskstats', async () => {
      const ret = await retrieveProcInfo(['cpuinfo', 'diskstats'])

      if (process.platform === 'linux') {
        assert(typeof ret.cpuinfo === 'object')
        assert(Object.keys(ret.cpuinfo).length)

        assert(typeof ret.diskstats === 'object')
        assert(Object.keys(ret.diskstats).length)
        assert(ret.cpuinfo['cpu family'])
      }
    })
  })
})

