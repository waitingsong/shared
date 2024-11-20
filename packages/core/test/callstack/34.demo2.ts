import type { CallerInfo } from '##/index.js'

import { demo } from './34.demo1.js'


// line order of callings is important
export function demo2(): CallerInfo { // line7
  const info = demo(1)
  return info
}

