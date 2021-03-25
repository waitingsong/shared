// @ts-nocheck

// eslint-disable-next-line @typescript-eslint/ban-types
export function deepFind(obj: object, paths: string[]): unknown {
  let ret = {
    ...obj,
  }

  for (let i = 0, len = paths.length; i < len; i += 1) {
    const path = paths[i]
    if (! path) {
      throw new Error(`Value of paths[${i}] empty`)
    }
    if (typeof ret[path] === 'undefined') {
      return void 0
    }
    ret = ret[path] as unknown
  }
  return ret
}

