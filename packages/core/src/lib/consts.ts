/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import { normalize } from './utils.js'


export const isWin32 = process.platform === 'win32'

export const userHome = isWin32
  ? normalize(process.env['USERPROFILE'] || '')
  : normalize(process.env['HOME'] ? `${process.env['HOME']}` : '')

export const defaultPropDescriptor: PropertyDescriptor = {
  configurable: true,
  enumerable: true,
  writable: true,
} as const

