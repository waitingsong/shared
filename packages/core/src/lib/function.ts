import assert from 'node:assert'

import type { MethodTypeUnknown } from '@waiting/shared-types'


export function isArrowFunction(fn: MethodTypeUnknown): boolean {
  assert(typeof fn === 'function', 'fn must be a function')
  return fn.toString().includes('=>')
}

