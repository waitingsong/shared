import type { CallerInfo } from '##/index.js'

import { _demo } from './34a.config.js'

// line order of callings is important

export function demo(distance = 0): CallerInfo { // line7
  const info = _demo(distance + 1)
  return info
}

