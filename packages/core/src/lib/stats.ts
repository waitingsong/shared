import { defaultPropDescriptor } from './consts'
import { nFormatter } from './helper'


interface HumanMemoryUsage {
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

