import { readFile } from 'fs/promises'

import { ProcCpuinfo, ProcInfo, ProcMeminfo, ProcStat } from '@waiting/shared-types'

import { defaultPropDescriptor } from './consts'
import { nFormatter } from './helper'


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
  const pms = [] as unknown as [Promise<string>, Promise<string>, Promise<string>]
  for (const name of arr) {
    const path = `/proc/${name}`
    const pm = readFile(path, 'utf-8').catch(() => '')
    pms.push(pm)
  }

  const arr2: (keyof ProcInfo)[] = ['stat']
  for (const name of arr2) {
    const path = `/proc/${name}`
    const pm = readFile(path, 'utf-8').catch(() => '')
    pms.push(pm)
  }

  const info: Promise<ProcInfo> = Promise.all(pms)
    .then((data) => {
      const cpuinfo = processCpuAndMemInfo(data[0]) as ProcCpuinfo
      const meminfo = processCpuAndMemInfo(data[1]) as ProcMeminfo
      const stat = processStatInfo(data[2])
      const res = {
        cpuinfo,
        meminfo,
        stat,
      }
      return res
    })

  return info
}

function processCpuAndMemInfo(str: string): ProcCpuinfo | ProcMeminfo {
  const row = {} as ProcCpuinfo | ProcMeminfo
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
function processStatInfo(str: string): ProcStat {
  const row = {} as ProcStat
  if (! str.length) {
    return row
  }
  str.split('\n').forEach((line) => {
    const parts = line.split(' ')
    if (parts.length >= 2) {
      const [key, ...value] = parts
      const k1 = key?.trim()
      if (! k1 || ! value.length) { return }

      row[k1] = value.join(' ')
    }
  })

  return row
}
