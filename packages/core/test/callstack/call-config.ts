import { CallerInfo, getCallerStack } from '../../src/lib/index.js'
// Should not change code existing or insert, append it!


export function test1(): CallerInfo {
  const callerInfo = getCallerStack(0, true)
  return callerInfo
}

export const test2 = (): CallerInfo => {
  return getCallerStack(0, true)
}

export function fake1(): CallerInfo {
  return getCallerStack(-1, true)
}

export function fake2(): CallerInfo {
  return getCallerStack(2, true)
}

export function test3(): CallerInfo {
  return (() => {
    return getCallerStack(0, true)
  })()
}

export function test4(): CallerInfo {
  return (() => {
    const info = getCallerStack(0, true)
    return info
  })()
}

export function test5(): CallerInfo {
  const cb = () => {
    const info = getCallerStack(0, true)
    return info
  }
  return cb()
}

