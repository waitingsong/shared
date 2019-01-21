import { normalize } from './utils'


/* istanbul ignore next */
export const isWin32 = process.platform === 'win32' ? true : false

/* istanbul ignore next */
export const userHome = isWin32
  ? normalize(process.env.USERPROFILE || '')
  : normalize(`${process.env.HOME}`)
