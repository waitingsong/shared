import type { MiddlewarePathPattern } from '@waiting/shared-types'


export function isPathMatchRules(
  path: string,
  rules?: MiddlewarePathPattern,
): boolean {

  let ret = false

  if (! path) {
    return ret
  }
  else if (! rules) {
    return ret
  }

  for (const rule of rules) {
    if (! rule) {
      continue
    }
    else if (typeof rule === 'string') {
      ret = rule === path
    }
    else if (rule instanceof RegExp) {
      ret = rule.test(path)
    }
    else if (typeof rule === 'function') {
      ret = rule(path)
    }

    if (ret) {
      break
    }
  }

  return ret
}
