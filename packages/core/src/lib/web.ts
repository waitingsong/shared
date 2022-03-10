import { PathPattern } from '@waiting/shared-types'


export function isPathMatchRules(
  path: string,
  rules?: PathPattern['match'] | PathPattern['ignore'],
): boolean {

  if (! path) {
    return false
  }
  else if (! rules) {
    return false
  }

  for (const rule of rules) {
    let ret = false
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

    if (ret === true) {
      return true
    }
  }

  return false
}
