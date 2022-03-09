/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { XOR } from './common'


export type MiddlewareConfig <T = unknown> = {
  /**
   * Enable middleware.
   * @default true
   */
  enableMiddleware: boolean,
  options?: T,
} & PathPattern

export type PathPattern = XOR<PathMatchPattern, PathIgnorePattern>

export interface PathMatchPattern {
  /**
   * match and ignore are exclusive exists
   * @description
   *   - `/` match root only
   *   - `/^\/$/` match root only
   */
  match?: MiddlewarePathPattern
}
export interface PathIgnorePattern {
  /**
   * match and ignore are exclusive exists
   * @description
   *   - `/` match root only
   *   - `/^\/$/` match root only
   */
  ignore?: MiddlewarePathPattern
}

export type PathPatternFunc = (ctx: any) => boolean
export type MiddlewarePathPattern = (string | RegExp | PathPatternFunc)[]

