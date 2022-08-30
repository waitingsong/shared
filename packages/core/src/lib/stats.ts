import { readFile } from 'node:fs/promises'

import {
  ProcCpuinfo,
  ProcInfo,
  ProcMeminfo,
  ProcDiskstats,
  ProcStat,
} from '@waiting/shared-types'

import { defaultPropDescriptor } from './consts.js'
import { nFormatter } from './helper.js'


export interface HumanMemoryUsage {
  pid: NodeJS.Process['pid']
  rss: string
  heapTotal: string
  heapUsed: string
  external: string
  arrayBuffers: string
}

/**
 * Human-readable NodeJS.MemoryUsage wit pid and ppid
 */
export function humanMemoryUsage(digits = 3, sep = ' '): HumanMemoryUsage {
  const mu: NodeJS.MemoryUsage = process.memoryUsage()
  const ret = {
    pid: process.pid,
  } as HumanMemoryUsage

  for (const [key, val] of Object.entries(mu)) {
    if (typeof val === 'number') {
      Object.defineProperty(ret, key, {
        ...defaultPropDescriptor,
        value: nFormatter(val, digits, sep),
      })
    }
  }
  return ret
}


export type ProcInfoItem = keyof ProcInfo
/**
 * Retrieve info from /proc/ for linux
 */
export async function retrieveProcInfo(
  items: ProcInfoItem[] = ['cpuinfo', 'meminfo', 'diskstats', 'stat'],
): Promise<Partial<ProcInfo>> {

  const info = { } as Partial<ProcInfo>
  if (process.platform !== 'linux') {
    return info
  }

  const pms: Promise<void>[] = []

  items.forEach((name) => {
    const path = `/proc/${name}`
    const pm = readFile(path, 'utf-8')
      .catch(() => '')
      .then((str) => {
        const data = str.includes(':')
          ? processInfoWithColon(str)
          : processInfoWithSpace(str)
        // @ts-expect-error
        info[name] = data
      })
    pms.push(pm)
  })

  const ret: Promise<Partial<ProcInfo>> = Promise.all(pms)
    .then(() => {
      return info
    })

  return ret
}

function processInfoWithColon(input: string): ProcCpuinfo | ProcMeminfo {
  const row = {} as ProcCpuinfo | ProcMeminfo
  const str = input.trim()
  if (! str.length) {
    return row
  }
  str.split('\n').forEach((line) => {
    const parts = line.split(':')
    if (parts.length === 2) {
      const [key, value] = parts
      const k1 = key?.trim()
      const v1 = value?.trim()
      if (! k1 || ! v1) { return }

      row[k1] = v1
    }
  })
  return row
}
function processInfoWithSpace(input: string): ProcDiskstats | ProcStat {
  const row = {} as ProcStat
  const str = input.trim()
  if (! str.length) {
    return row
  }
  str.split('\n').forEach((line) => {
    const parts = line.split(' ')
    if (parts.length >= 2) {
      const [key, ...value] = parts
      const k1 = key?.trim()
      if (! k1 || ! value.length) { return }

      row[k1] = value.join(' ').trim()
    }
  })

  return row
}
