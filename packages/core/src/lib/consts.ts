/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { normalize } from './utils'


/* istanbul ignore next */
export const isWin32 = process.platform === 'win32'

/* istanbul ignore next */
export const userHome = isWin32
  ? normalize(process.env.USERPROFILE || '')
  : normalize(process.env.HOME ? `${process.env.HOME}` : '')

