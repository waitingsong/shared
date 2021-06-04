import { readFile } from 'fs/promises'

import { ProcInfo } from '@waiting/shared-types'

import { defaultPropDescriptor } from './consts'
import { nFormatter } from './helper'


export interface HumanMemoryUsage {
  rss: string
  heapTotal: string
  heapUsed: string
  external: string
  arrayBuffers: string
}

/**
 * Human-readable NodeJS.MemoryUsage
 */
export function humanMemoryUsage(digits = 3, sep = ' '): HumanMemoryUsage {
  const mu: NodeJS.MemoryUsage = process.memoryUsage()
  const ret = {} as HumanMemoryUsage
  for (const [key, val] of Object.entries(mu)) {
    Object.defineProperty(ret, key, {
      ...defaultPropDescriptor,
      value: nFormatter(val, digits, sep),
    })
  }
  return ret
}


/**
 * Retrieve info from /proc/ for linux
 */
export async function retrieveProcInfo(): Promise<ProcInfo> {
  const ret = {
    cpuinfo: {},
    meminfo: {},
    stat: {},
  } as ProcInfo
  if (process.platform !== 'linux') {
    return ret
  }

  const arr: (keyof ProcInfo)[] = ['cpuinfo', 'meminfo']
  for (const name of arr) {
    try {
      const path = `/proc/${name}`
      // eslint-disable-next-line no-await-in-loop
      const str = await readFile(path, 'utf-8')
      str.split('\n').forEach((line) => {
        const parts = line.split(':')
        if (parts.length === 2) {
          const [key, value] = parts
          const k1 = key?.trim()
          const v1 = value?.trim()
          if (! k1 || ! v1) { return }

          ret[name][k1] = v1
        }
      })
    }
    catch (ex) {
      console.warn(ex)
    }
  }

  const arr2: (keyof ProcInfo)[] = ['stat']
  for (const name of arr2) {
    try {
      const path = `/proc/${name}`
      // eslint-disable-next-line no-await-in-loop
      const str = await readFile(path, 'utf-8')
      str.split('\n').forEach((line) => {
        const parts = line.split(' ')
        if (parts.length >= 2) {
          const [key, ...value] = parts
          const k1 = key?.trim()
          if (! k1 || ! value.length) { return }

          ret[name][k1] = value.join(' ')
        }
      })
    }
    catch (ex) {
      console.warn(ex)
    }
  }

  return ret
}
